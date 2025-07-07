import express from 'express';
import {createProject, getProjects, joinProject} from '../controllers/project.controllers.js';


const projectRouter = express.Router();

projectRouter.get('/api/get-projects', getProjects);
projectRouter.post('/api/create-project', createProject);
projectRouter.post('/api/join-project', joinProject);

export default projectRouter;