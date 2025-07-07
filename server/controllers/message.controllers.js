import ChatRoom from "../models/chat_room.models.js";
import Message from "../models/message.models.js";

export const sendMessage = async (req, res) => {
    try {
        const {sender, content, chatRoomId} = req.body;
        const message = new Message({
            sender: sender,
            content: content,
            chatRoom: chatRoomId
        });
        await message.save();

        const chatRoom = await ChatRoom.findById(chatRoomId);
        chatRoom.messages.push(message._id);
        await chatRoom.save();
        res.status(201).json({message: "Message sent successfully", message});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({chatRoom: req.params.chatRoomId});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}