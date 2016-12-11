var mongoose = require('mongoose');

var AccessSchema = new mongoose.Schema({
    siteId: String,
    socketId: String,
    creationDate: Date,
    used: {type: Boolean, default: false}
});

module.exports = mongoose.model('Access', AccessSchema);