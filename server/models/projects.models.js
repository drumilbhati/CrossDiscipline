import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId, ref: 'user',
        required: true
    },
    members: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    domains: {
        type: Array,
        default: []
    },
    contact: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Open'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

const Project = mongoose.model('project', projectSchema);

export default Project;