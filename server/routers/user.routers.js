import express from 'express';
import {createUser, findAllUsers, findUser} from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.post('/api/create-user', createUser);
userRouter.get('/api/find-user', findUser);
userRouter.get('/api/users', findAllUsers);

export default userRouter;