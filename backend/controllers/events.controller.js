import Event from "../models/events.models.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const createEvent = async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        createdBy: req.body.createdBy,
        attendees: req.body.attendees,
        capacity: req.body.capacity,
        membershipRequired: req.body.membershipRequired
    });
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const registerForEvent = async (req, res) => {
    try {
        const { token, event_title} = req.body;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select('-password');
        const event = await Event.findOne({ title: event_title });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (user.membership === 'None' && event.membershipRequired !== 'None') {
            return res.status(400).json({ message: 'Membership required' });
        }
        if (user.membership === 'Level1' && (event.membershipRequired !== 'Level2' || event.membershipRequired !== 'Level3')) {
            return res.status(400).json({ message: 'Invalid membership level' });
        }
        if (user.membership === 'Level2' && event.membershipRequired !== 'Level3') {
            return res.status(400).json({ message: 'Invalid membership level' });
        }
        if (event.attendees.includes(user.username)) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }
        if (event.capacity <= event.attendees.length) {
            return res.status(400).json({ message: 'Event is full' });
        }
        event.attendees.push(user.username);
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEvent = async(req, res) => {
    try {
        const { token, eventId} = req.body;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select('-password');
        if (user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await Event.deleteOne({ _id: eventId });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}