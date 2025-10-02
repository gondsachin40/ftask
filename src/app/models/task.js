import mongoose from "mongoose";
import Objective from "./objective.js";
const { Schema } = mongoose;

const taskSchema = new Schema({
    taskTitle: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    links: {
        type: [String],
    },
    tasksId: {
        type: Schema.Types.ObjectId,
        required: true,

    }
    ,
}, { timestamps: true }, { _id: false });
const Task = mongoose.model("task", taskSchema);
export default Task;