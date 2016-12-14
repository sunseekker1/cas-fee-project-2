var Client = require('../models/client');

// Create endpoint /api/clients for POST
exports.postClient = function (req, res) {
    var client = new Client({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    client.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'New Client added', data: client});
    });
};

// Create endpoint /api/clients for GET
exports.getClients = function (req, res) {
    Client.find(function (err, clients) {
        if (err)
            res.send(err);

        var result = {"data": clients};
        res.json(result);
    });
};

// Create endpoint /api/clients/:client_id for GET
exports.getClient = function (req, res) {
    Client.find({_id: req.params.id}, function (err, client) {
        if (err)
            res.send(err);

        res.json(client);
    });
};


// Create endpoint /api/clients/:client_id for PUT
exports.putClient = function (req, res) {
    if (!req.params.id.length) {
        console.log('Error on PUT Operation');
        return null;
    }

    var fieldsToUpdate = {};
    if (req.body.password !== undefined && req.body.password.length) {
        fieldsToUpdate.password = req.body.password;
    }
    if (req.body.username !== undefined && req.body.username.length) {
        fieldsToUpdate.username = req.body.username;
    }
    if (req.body.email !== undefined) {
        fieldsToUpdate.email = req.body.email;
    }
    if (req.body.firstname !== undefined) {
        fieldsToUpdate.firstname = req.body.firstname;
    }
    if (req.body.lastname !== undefined) {
        fieldsToUpdate.lastname = req.body.lastname;
    }

    Client.update({_id: req.params.id}, fieldsToUpdate, function (err, num, raw) {
        if (err)
            res.send(err);

        res.json({message: num + ' client updated'});
    });
};

// Create endpoint /api/clients/:client_id for DELETE
exports.deleteClient = function (req, res) {
    Client.remove({_id: req.params.id}, function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Client removed!'});
    });
};
