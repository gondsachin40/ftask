import mongoose from "mongoose";
import user from "./user.js";
const { Schema } = mongoose;

const objectiveSchema = new Schema({
    title: String,
    createdby: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
    ,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "task"
    }]
}, { timestamps: true });

const Objective = mongoose.model("objective", objectiveSchema);

export default Objective;