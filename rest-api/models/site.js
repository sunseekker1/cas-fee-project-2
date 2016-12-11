var mongoose = require('mongoose');

var SiteSchema = new mongoose.Schema({
    clientId: String,
    title: String,
    secret: String
});

module.exports = mongoose.model('Site', SiteSchema);