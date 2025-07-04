import express from 'express';
import multer from 'multer';
import { getFile, uploadFile } from '../controllers/file.controllers.js';

const fileRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileRouter.post('/api/files/uploadFile', upload.single('file'), uploadFile);
fileRouter.get('api/files/:id', getFile);

export default fileRouter;