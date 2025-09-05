import mongoose, { Schema } from "mongoose";
const projectSchema = new mongoose.Schema({

    projectName: { type: String, required: true, unique: true, trim: true },
    projectDiscription: { type: String , required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
},{
    timestamps: true
})

export default mongoose.model('Project' , projectSchema);