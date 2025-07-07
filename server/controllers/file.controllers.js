import File from '../models/file.models.js';

export const uploadFile = async (req, res) => {
    try {
        const {originalname, buffer, mimeType} = req.file;

        const file = new File({
            name: originalname,
            data: buffer,
            contentType: mimeType
        });

        await file.save();
        res.status(201).json({message: 'File uploaded successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error uploading file'});
    }
};

export const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({message: 'File not found'});
        }

        res.contentType(file.contentType);
        res.send(file.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error retrieving file from the server'});
    }
}