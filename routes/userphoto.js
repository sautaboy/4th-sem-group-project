const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
    // Add other fields as needed
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
