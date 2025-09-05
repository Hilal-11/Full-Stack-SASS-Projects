import mongoose, { Schema } from "mongoose";
const noteSchema = new mongoose.Schema({
    project: { type: Schema.Types.ObjectId, ref: "Project" , required: true },


},{ timestamps: true })

export default mongoose.model('Note' , noteSchema);