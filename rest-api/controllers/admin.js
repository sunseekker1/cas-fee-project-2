var Admin = require('../models/admin');

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

        res.json({ message: 'New admin added' });
    });
};

// Create endpoint /api/admins for GET
exports.getAdmins = function(req, res) {
    Admin.find(function(err, admins) {
        if (err)
            res.send(err);

        res.json(admins);
    });
};

// Create endpoint /api/admins/:admin_id for GET
exports.getAdmin = function(req, res) {
    Admin.find({ adminId: req.admin._id, _id: req.params.admin_id }, function(err, admin) {
        if (err)
            res.send(err);

        res.json(admin);
    });
};


// Create endpoint /api/admins/:admin_id for PUT
exports.putAdmin = function(req, res) {
    Admin.update({ adminId: req.admin._id, _id: req.params.admin_id }, { password: req.body.password, username: req.body.username, email: req.body.email }, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' admin updated' });
    });
};

// Create endpoint /api/admins/:admin_id for DELETE
exports.deleteAdmin = function(req, res) {
    Admin.remove({ adminId: req.admin._id, _id: req.params.admin_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Admin removed' });
    });
};
