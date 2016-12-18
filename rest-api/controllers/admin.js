var passport = require('passport');
var Admin = require('../models/admin');

// Create endpoint /api/admins for POST
exports.postAdmin = function (req, res) {
    var admin = new Admin({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    admin.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'New Admin added', data: admin});
    });
};

// Create endpoint /api/admins for GET
exports.getAdmins = function (req, res) {
    Admin.find(function (err, admins) {
        if (err)
            res.send(err);

        var result = {"data": admins};
        res.json(result);
    });
};

// Create endpoint /api/admins/:admin_id for GET
exports.getAdmin = function (req, res) {
    Admin.find({_id: req.params.id}, function (err, admin) {
        if (err)
            res.send(err);

        res.json(admin);
    });
};

// Create endpoint /api/admins/:admin_id for PUT
exports.putAdmin = function (req, res) {

    if (!req.params.id.length) {
        console.log('Error on PUT Operation');
        return null;
    }

    Admin.findById(req.params.id, function(err, admin) {
        if (err)
            res.send(err);

        if (req.body.password !== undefined && req.body.password !== null && req.body.password.length) {
            admin.password = req.body.password;
        }
        if (req.body.username !== undefined && req.body.username !== null && req.body.username.length) {
            admin.username = req.body.username;
        }
        if (req.body.email !== undefined && req.body.email !== null) {
            admin.email = req.body.email;
        }
        if (req.body.firstname !== undefined && req.body.firstname !== null) {
            admin.firstname = req.body.firstname;
        }
        if (req.body.lastname !== undefined && req.body.lastname !== null) {
            admin.lastname = req.body.lastname;
        }

        // Save the beer and check for errors
        admin.save(function(err) {
            if (err)
                res.send(err);

            res.json({message: admin + ' admin updated'});
        });
    });
};

// Create endpoint /api/admins/:admin_id for DELETE
exports.deleteAdmin = function (req, res) {
    Admin.remove({_id: req.params.id}, function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Admin removed'});
    });
};

// Create endpoint /api/admins/login for POST
exports.login = function (req, res) {

    Admin.findOne({username: req.body.username}, function (err, admin) {
        console.log("login.service.ts findOne 1", admin);
        if (err) {
            return res.json({success: false, err: err});
        }

        // No user found with that username
        if (!admin) {
            return res.json({success: false, err: "No user found with that username"});
        }

        // Make sure the password is correct
        admin.verifyPassword(req.body.password, function (err, isMatch) {
            console.log("login.service.ts verifyPassword 1", isMatch);
            if (err) {
                return res.json({success: false, err: err});
            }

            // Password did not match
            if (!isMatch) {
                return res.json({success: false, err: 'Password did not match'});
            }

            // Success
            return res.json({success: true, admin: admin});
        });
    });
};
