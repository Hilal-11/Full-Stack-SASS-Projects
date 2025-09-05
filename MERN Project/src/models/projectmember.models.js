import mongoose from "mongoose";
const projectmemberSchema = new mongoose.Schema({

},{
    timestamps: true
})

export default mongoose.model('ProjectMember' , projectmemberSchema);