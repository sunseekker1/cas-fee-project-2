var Access = require('../models/access');

// Create endpoint /api/accesses for POST
exports.postAccess = function (req, res) {
    var access = new Access();

    access.id = req.body._id;
    access.siteId = req.body.siteId;
    access.socketId = req.body.socketId;
    access.clientId = req.body.clientId;
    access.used = false;
    access.creationDate = new Date();

    access.save(function (err) {
        if (err)
            res.send(err);


        res.json({message: 'Access record added!', data: access});
    });
};

// Create endpoint /api/accesses/ for GET
exports.getAccesses = function (req, res) {
    // Use the Access model to find a specific beer
    Access.find({clientId: req.client._id}, function (err, accesses) {
        if (err)
            res.send(err);

        var result = {"data": accesses};
        res.json(result);
    });
};

// Create endpoint /api/accesses/:access_id for GET
exports.getAccess = function (req, res) {
    Access.find({_id: req.params.id}, function (err, access) {
        if (err)
            res.send(err);

        res.json(access);
    });
};

// Create endpoint /api/accesses/:access_id for PUT
exports.putAccess = function (req, res) {

    if (!req.params.id.length) {
        console.log('Error on PUT Operation');
        return null;
    }

    var fieldsToUpdate = {};
    if (req.body.used !== undefined && req.body.used.length) {
        fieldsToUpdate.used = req.body.used;
    }

    Access.update({_id: req.params.id}, fieldsToUpdate, function (err, num, raw) {
        if (err)
            res.send(err);

        res.json({message: num + ' access status updated'});
    });
};
