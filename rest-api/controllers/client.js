var Client = require('../models/client');

// Create endpoint /api/clients for POST
exports.postClient = function(req, res) {
    var client = new Client({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    client.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'New client added' });
    });
};

// Create endpoint /api/clients for GET
exports.getClients = function(req, res) {
    Client.find(function(err, clients) {
        if (err)
            res.send(err);

        var result = {"data": clients};
        res.json(result);
    });
};

// Create endpoint /api/clients/:client_id for GET
exports.getClient = function(req, res) {
    Client.find({ clientId: req.client._id, _id: req.params.client_id }, function(err, client) {
        if (err)
            res.send(err);

        res.json(client);
    });
};


// Create endpoint /api/clients/:client_id for PUT
exports.putClient = function(req, res) {
    Client.update({ clientId: req.client._id, _id: req.params.client_id }, { username: req.body.username, password: req.body.password, email: req.body.email   }, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' client updated' });
    });
};

// Create endpoint /api/clients/:client_id for DELETE
exports.deleteClient = function(req, res) {
    Client.remove({ clientId: req.client._id, _id: req.params.client_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Client removed!' });
    });
};
