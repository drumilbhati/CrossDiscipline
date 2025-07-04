import Project from '../models/projects.models.js';
import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const createProject = async (req, res) => {
    try {
        const { token, title, description, owner, members, domains, contact, deadline, status } = req.body;

        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let project = await Project.findOne({ title });
        if (project) {
            return res.status(400).json({ error: 'Project already exists' });
        
        }

        const ownerUser = await User.findOne({ username: owner });
        if (!ownerUser) {
            return res.status(404).json({ error: 'Owner not found' });
        }

        const memberUsers = await User.find({ username: { $in: members } });
        if (memberUsers.length !== members.length) {
            return res.status(404).json({ error: 'One or more members not found' });
        }

        // Store owner and members as user objects
        const ownerObject = ownerUser._id;
        const memberObjects = memberUsers.map(user => user._id);

        project = new Project({
            title,
            description,
            owner: ownerObject,
            members: memberObjects,
            domains,
            contact,
            deadline,
            status,
        });

        await project.save();

        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error("Project creation error", error);
        res.status(500).json({ error: 'Server error' });
    } 
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error getting projects", error);
        res.status(500).json({ error: 'Server error' });
        
    }
};

export const joinProject = async(req, res) => {
    const { token, project_title } = req.body;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.userId).select('-password');
    const project = await Project.findOne({ title: project_title });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    if (project.status !== 'Open') {
        return res.status(400).json({
            message: 'Project is not accepting new members'
        });
    }

    if (project.members.includes(user._id)) {
        return res.status(400).json({
            message: 'User is already a member of this project'
        });
    }

    project.members.push(user._id);
    await project.save();

    res.status(200).json({
        message: 'Successfully joined project',
        project: project
    });
};

export const deleteProject = async(req, res) => {
    try {
        const { token, projectId } = req.body;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select('-password');
        const project = await Project.findById(projectId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        if (project.owner !== user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await Project.deleteOne({ _id: projectId });
        res.status(200).json({ message: 'Project deleted successfully' });
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};