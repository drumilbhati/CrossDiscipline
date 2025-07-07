import ChatRoom from "../models/chat_room.models.js";

export const createOrFindChatRoom = async (req, res) => {
    try {
        const {name} = req.body;
        let chatRoom = await ChatRoom.findOne({name});
        if (!chatRoom) {
            chatRoom = new ChatRoom({name: name});
            await chatRoom.save();
        }
        res.status(200).json(chatRoom);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}