import express from 'express';
import { createUser } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/api/create-user', createUser);

export default router;