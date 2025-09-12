import mongoose, { Schema } from "mongoose";
import { AvaliableUserRoles , UserRolesEnum } from '../utils/constants'
const projectmemberSchema = new mongoose.Schema({

    user: { type: Schema.Types.ObjectId, ref: "User", required: true, },
    project: { type: Schema.Types.ObjectId, ref: "Project" , required: true},
    role: { type: String , enum: AvaliableUserRoles , default: UserRolesEnum.MEMBER, required: true}
    
},{
    timestamps: true
})

export default mongoose.model('ProjectMember' , projectmemberSchema);