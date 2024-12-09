import express from 'express';
import { findUser, createUser, authenticateUser, findAdmin, donate, findProfile, subscribe } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/api/login', findUser);
router.get('/api/auth-endpoint', authenticateUser);

router.post('/api/admin-login', findAdmin);

router.post('/api/register', createUser);

router.post('/api/donate', donate);

router.get('/api/demo', (req, res)=> {
    res.send("Hi");
})

router.post('/api/profile', findProfile);

router.post('/api/subscribe', subscribe);

export default router;

