import mongoose from "mongoose";
import objective from "./objective.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "objective"
    }],
    invitations: [{
        type: Schema.Types.ObjectId,
        ref: "objective",
    }],
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export default User;