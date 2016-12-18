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

    Client.findById(req.params.id, function(err, client) {
        if (err)
            res.send(err);

        if (req.body.password !== undefined && req.body.password !== null && req.body.password.length) {
            client.password = req.body.password;
        }
        if (req.body.username !== undefined && req.body.username !== null && req.body.username.length) {
            client.username = req.body.username;
        }
        if (req.body.email !== undefined && req.body.email !== null) {
            client.email = req.body.email;
        }
        if (req.body.firstname !== undefined && req.body.firstname !== null) {
            client.firstname = req.body.firstname;
        }
        if (req.body.lastname !== undefined && req.body.lastname !== null) {
            client.lastname = req.body.lastname;
        }

        // Save the client and check for errors
        client.save(function(err) {
            if (err)
                res.send(err);

            res.json({message: client + ' client updated'});
        });
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
