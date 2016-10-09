var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var AdminSchema = new mongoose.Schema({
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

// Execute before each admin.save() call
AdminSchema.pre('save', function(callback) {
    var admin = this;

    // Break out if the password hasn't changed
    if (!admin.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(admin.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            admin.password = hash;
            callback();
        });
    });
});

AdminSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', AdminSchema);