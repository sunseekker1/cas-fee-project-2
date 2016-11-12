var mongoose = require('mongoose');

var HeroSchema   = new mongoose.Schema({
    id: String,
    name: String
});

module.exports = mongoose.model('Hero', HeroSchema);