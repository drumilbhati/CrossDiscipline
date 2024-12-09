import express from "express";
import { createEvent, getEvents, registerForEvent, deleteEvent } from "../controllers/events.controller.js";

const router = express.Router();

router.post('/api/post-event', createEvent);

router.get('/api/get-events', getEvents);

router.post('/api/register-for-event', registerForEvent);

router.post('/api/delete-event', deleteEvent);

export default router;