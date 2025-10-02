import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    id: { type: String },
    avatar: { type: {
        url: String,
        localpath: String
    },default: { url: "https://placehold.co/600x400", localpath: ""}},
    username: { type: String, required: true, unique: true, trim: true, lowercase: true, index:true },
    fullname: { type: String, required: true , trim: true,},
    password: { type: String, required: true , trim: true , },
    email: { type: String, required: true , unique:true, index:true, lowercase:true , trim: true},
    isVarifiedEmail: { type: Boolean, default: false },
    refreshToken: { type: String },
    forgetPasswordToken: { type: String },
    forgetPasswordExpiry: { type: Date },
    emailVarificationToken: { type: String },
    emailVarificationTokenExpiry: { type: Date }
},{timestamps: true })

UserSchema.pre("save" , async function(next){
    if(this.isModified("password")) {
        const saltRound = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , saltRound);
    }
    next();
});
UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}
UserSchema.methods.genrateAccessToken = async function() {
    return jwt.sign({
        _id: this.id,
        user: this.username,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET_KEY,
    {   
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
UserSchema.methods.genrateRefreshToken =  function() {
    return jwt.sign({
        _id: this.id,
        user: this.username,
        email: this.email,
    }, process.env.REFRESH_TOKEN_SECRET_KEY,
    {   
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
UserSchema.methods.generateTempraryToken = async function() {
    const unHashedToken = crypto.randomBytes(20).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")
    const tokenExpiry = Date.now() + (20 * 60 * 10000); //20-minutes

    return { unHashedToken , hashedToken , tokenExpiry}
}

export default mongoose.model("User", UserSchema)