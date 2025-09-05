import mongoose, { Schema } from "mongoose";
const projectmemberSchema = new mongoose.Schema({

    user: { type: String},
    project: { type: Schema.Types.ObjectId, ref: "Project" , required: true},
    role: { }
    
},{
    timestamps: true
})

export default mongoose.model('ProjectMember' , projectmemberSchema);