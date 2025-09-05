import mongoose, { Schema } from "mongoose";
const projectSchema = new mongoose.Schema({

    projectName: { type: String, required: true },
    projectDiscription: { type: String , required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
},{
    timestamps: true
})

export default mongoose.model('Project' , projectSchema);