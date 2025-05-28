import express from 'express';
const messageRouter = express.Router();
import { sendMessage, getMessages } from '../controllers/message.controllers.js';

messageRouter.post('/api/sendMessage', sendMessage);
messageRouter.get('/api/messages/:chatRoomId', getMessages);

export default messageRouter;