import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be atleast 6 characters']
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin', 'user'],
        default: 'student'
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
    skills: {
        type: Array,
        default: []
    },
    projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
export default User;