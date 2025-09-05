import mongoose from "mongoose";
const subTasksSchema = new mongoose.Schema({
    
},{
    timestamps: true
})

export default mongoose.model('SubTasks' , subTasksSchema);