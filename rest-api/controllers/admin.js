var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');

// Create endpoint /api/admins for POST
exports.postAdmin = function(req, res) {
    var admin = new Admin({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    admin.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'New Admin added', data: admin });
    });
};

// Create endpoint /api/admins for GET
exports.getAdmins = function(req, res) {
    Admin.find(function(err, admins) {
        if (err)
            res.send(err);

        var result = {"data": admins};
        res.json(result);
    });
};

// Create endpoint /api/admins/:admin_id for GET
exports.getAdmin = function(req, res) {
    Admin.find({ _id: req.params.id }, function(err, admin) {
        if (err)
            res.send(err);

        res.json(admin);
    });
};

// Create endpoint /api/admins/:admin_id for PUT
exports.putAdmin = function(req, res) {

    if (!req.params.id.length){
        console.log('Error on PUT Operation');
        return null;
    }

    var fieldsToUpdate = {};
    if (req.body.password !== undefined && req.body.password.length){
        fieldsToUpdate.password = req.body.password;
    }
    if (req.body.username !== undefined && req.body.username.length){
        fieldsToUpdate.username = req.body.username;
    }
    if (req.body.email !== undefined){
        fieldsToUpdate.email = req.body.email;
    }

    Admin.update({ _id: req.params.id }, fieldsToUpdate, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' admin updated' });
    });
};

// Create endpoint /api/admins/:admin_id for DELETE
exports.deleteAdmin = function(req, res) {
    Admin.remove({ _id: req.params.id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Admin removed' });
    });
};

// Create endpoint /api/admins/:admin_id for GET
exports.login = function(req, res) {


    // bcrypt.genSalt(5, function(err, salt) {
    //     if (err) return callback(err);
    //
    //     bcrypt.hash(admin.password, salt, null, function(err, hash) {
    //         if (err) return callback(err);
    //         admin.password = hash;
    //         callback();
    //     });
    // });

    // var encryptedPassword;

    // bcrypt.genSalt(5, function(err, salt) {
    //     if (err) return err;
    //
    //     bcrypt.hash(req.body.password, salt, null, function(err, hash) {
    //         console.log('req.body.password', hash);
    //         if (err) return err;
    //         this.encryptedPassword = hash;
    //     });
    // });

    console.log("login.service.ts", req.body.password);

    var result;


    return {"username": "admin"};

    // Admin.findOne({username: req.body.username, password: req.body.password }, function (err, admin) {
    //     if (err) { return false; }
    //
    //     // No user found with that username
    //     if (!admin) { return false; }
    //
    //     // Make sure the password is correct
    //     this.result = admin.verifyPassword(req.body.password, function(err, isMatch) {
    //         if (err) { return false; }
    //
    //         // Password did not match
    //         if (!isMatch) { return false; }
    //
    //         // Success
    //         return admin;
    //     });
    // });


};
