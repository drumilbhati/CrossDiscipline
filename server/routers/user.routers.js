import express from 'express';
import { createUser, findUser } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.post('/api/create-user', createUser);
userRouter.get('/api/find-user', findUser);

export default userRouter;