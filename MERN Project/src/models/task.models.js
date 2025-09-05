import mongoose, { Schema } from "mongoose";
const tasksSchema = new mongoose.Schema({

    title: { type: String, required: true },
    discription: { type: String , required: true },
    project: {},
    assignTo: { type: Schema.Types.ObjectId, ref: "ProjectMember", require: true},
    status: {},
    attachments: { type: [] , required: false }
    
},{
    timestamps: true
})

export default mongoose.model('Tasks' , tasksSchema);