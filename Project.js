const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    crypt: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required : true
    },
    city: {
        type: String,
        required : true
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);