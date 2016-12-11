var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ClientSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String
});

// Execute before each client.save() call
ClientSchema.pre('save', function (callback) {
    var client = this;

    // Break out if the password hasn't changed
    if (!client.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(client.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            client.password = hash;
            callback();
        });
    });
});

ClientSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Client', ClientSchema);