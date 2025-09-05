import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema({

},{
    timestamps: true
})

export default mongoose.model('Tasks' , tasksSchema);