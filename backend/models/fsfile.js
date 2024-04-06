const mongoose = require('../connect/connect');
const { Schema } = mongoose;

// Định nghĩa schema cho tệp trong GridFS
const FileSchema = new Schema({
    filename: String,
    contentType: String,
    length: Number,
    uploadDate: Date,
    metadata: Object
});

// Tạo model từ schema
const FileModel = mongoose.model('File', FileSchema, 'fs.files');
module.exports = FileModel