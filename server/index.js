import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/user.routers.js';
import projectRouter from './routers/project.routers.js';
import {Server} from 'socket.io';
import {createServer} from 'http';
import fileRouter from './routers/file.router.js';
import path from 'path';
import {fileURLToPath} from 'url';
import messageRouter from './routers/message.router.js';
import chatRoomRouter from './routers/chat_room.router.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
}));
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);
app.use(fileRouter);
app.use(messageRouter);
app.use(chatRoomRouter);
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('join room', (room) => {
        socket.rooms.forEach(r => {
            if (r !== socket.id) socket.leave(r);
        });
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('chat message', ({room, message}) => {
        if (socket.rooms.has(room)) {
            io.to(room).emit('chat message', {
                message,
                sender: socket.id
            });
            console.log(`Message to ${room}: ${message}`);
        }
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});