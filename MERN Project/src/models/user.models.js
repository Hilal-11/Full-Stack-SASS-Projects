import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    id: { type: String },
    avatar: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isVarifiedEmail: { type: Boolean, default: false },
    refreshToken: { type: String },
    forgetPasswordToken: { type: String },
    emailVarifyToken: { type: String },
    emailVarifyTokenExpiry: { type: String }

},{timestamps: true })

export default mongoose.model("User", UserSchema)