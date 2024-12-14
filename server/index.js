import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/user.routers.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

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
app.use(cors());
app.use(express.json());
app.use(userRouter);

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
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});