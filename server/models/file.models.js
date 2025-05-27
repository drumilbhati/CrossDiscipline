import mongoose, { model } from "mongoose";

const fileSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

const File = mongoose.model('file', fileSchema);
export default File;