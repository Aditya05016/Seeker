const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId : {type: String, required: true, unique: true},
    title : {type: String, required: true},
    transcript : [
        {
            text: String,
            start: Number, // 'startime' ko 'start' kar diya matching ke liye
            duration: Number,
        }
    ],
    rawText: {type: String}, // 'rowttext' ki spelling fix
    summary: {type: String}, 
}, {timestamps: true});

module.exports = mongoose.model('Video', videoSchema); // exports ki spelling fix