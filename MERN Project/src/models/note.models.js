import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({

},{
    timestamps: true
})

export default mongoose.model('Note' , noteSchema);