import express from 'express';
import {createOrFindChatRoom} from '../controllers/chat_room.controllers.js';

const chatRoomRouter = express.Router();

chatRoomRouter.post('/api/chatRoom', createOrFindChatRoom);

export default chatRoomRouter;