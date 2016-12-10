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
    Admin.update({ _id: req.params.id }, { password: req.body.password, username: req.body.username, email: req.body.email }, function(err, num, raw) {
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
exports.loginAdmin = function(req, res) {


    // bcrypt.genSalt(5, function(err, salt) {
    //     if (err) return callback(err);
    //
    //     bcrypt.hash(admin.password, salt, null, function(err, hash) {
    //         if (err) return callback(err);
    //         admin.password = hash;
    //         callback();
    //     });
    // });

    var encryptedPassword;

    bcrypt.genSalt(5, function(err, salt) {
        if (err) return err;

        bcrypt.hash(req.body.password, salt, null, function(err, hash) {
            console.log('req.body.password', hash);
            if (err) return err;
            this.encryptedPassword = hash;
        });
    });

    console.log('req.body.password', req.body.password, "enc", encryptedPassword);

    Admin.find({username: req.body.username, password: encryptedPassword }, function(err, admin) {
        if (err)
            res.send(err);

        res.json(admin);
    });
};
