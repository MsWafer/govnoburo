const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    crypt: {
        type: Number
    },
    projectName: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required : true
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);