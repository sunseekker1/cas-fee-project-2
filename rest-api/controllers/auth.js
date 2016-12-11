var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Admin = require('../models/admin');

passport.use(new BasicStrategy(
    function (username, password, callback) {
        Admin.findOne({username: username}, function (err, admin) {
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!admin) {
                return callback(null, false);
            }

            // Make sure the password is correct
            admin.verifyPassword(password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, admin);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', {session: false});