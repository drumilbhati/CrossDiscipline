import User from '../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'student',
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("User creation error", error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const findUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({ email });

        if (user) {
            const isCorrect = bcrypt.compare(password, user.password);
            
            if (isCorrect) {
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error finding error", error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).message({ message: 'Not found' });
        }
    } catch (error) {
        console.log('Error getting users', error);
        res.status(500).json({ error: 'Server error' });   
    }
}