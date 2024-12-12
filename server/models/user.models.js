import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        // role defines the user as a student or a faculty
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1627481523/avatar/avatar_cugq40.png'
    },
    age: {
        type: Number,
        default: 0
    },
    major: {
        type: String,
        default: ''
    },
    school: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    skills: {
        type: Array,
        default: []
    },
    projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
export default User;