import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/user.routers.js';

dotenv.config();

const app = express();
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});