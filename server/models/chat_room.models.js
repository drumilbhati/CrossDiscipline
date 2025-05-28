import mongoose from 'mongoose';

const chatRoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;