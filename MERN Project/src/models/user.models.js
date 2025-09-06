import mongoose from 'mongoose'
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
UserSchema.post();


export default mongoose.model("User", UserSchema)