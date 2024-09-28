import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [
            { type: String }
        ], // know why it is of array type. (because we will be using skillsArray later which stores multiple skills in array form.)
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: {
            type: mongoose.Schema.Types.ObjectId, ref: "Company"
        },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);