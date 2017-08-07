const mongoose = require('mongoose');

module.exports = mongoose.model('Roles', new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    rankNumber: {
        type: String
    },
    commandingOfficer: {
        type: String,
        required: true
    },
    commands: [{
        name: {
            type: String,
        },
        active: Boolean,
    }],
    handlers: [{
        name: {
            type: String,
        },
        active: Boolean
    }],
    isLogging: {
        type: Boolean,
        required: true,
        default: false
    },
    dateAdded: {
        type: Date,
    },
}));