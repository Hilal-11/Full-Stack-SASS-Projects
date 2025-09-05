import mongoose, { Schema } from "mongoose";
import { TaskStatusEnum , AvaliableTasks } from '../utils/constants'
const tasksSchema = new mongoose.Schema({

    title: { type: String, required: [true, "Project ref is required"], trim: true },
    discription: { type: String , required: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true},
    assignBy: { type: Schema.Types.ObjectId, ref: "User", require: true},
    assignTo: { type: Schema.Types.ObjectId, ref: "User", require: true},
    status: { enum: AvaliableTasks , default: TaskStatusEnum.TODO, required: true},
    attachments: { type: [
        { url: String , mimetype: String , size: Number , default: []}
    ]} 
},{
    timestamps: true
})

export default mongoose.model('Tasks' , tasksSchema);