var Site = require('../models/site');

// Create endpoint /api/sites for POST
exports.postSite = function (req, res) {
    var site = new Site();

    site.id = req.body._id;
    site.clientId = req.body.clientId;
    site.title = req.body.title;
    site.url = req.body.url;
    site.secret = req.body.secret;

    site.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'New Site added', data: site});
    });
};

// Create endpoint /api/sites for GET
exports.getSites = function (req, res) {
    Site.find(function (err, sites) {
        if (err)
            res.send(err);

        var result = {"data": sites};
        res.json(result);
    });
};

// Create endpoint /api/sites/:site_id for GET
exports.getSite = function (req, res) {
    Site.find({_id: req.params.id}, function (err, site) {
        if (err)
            res.send(err);

        res.json(site);
    });
};


// Create endpoint /api/sites/:id for PUT
exports.putSite = function (req, res) {

    var fieldsToUpdate = {};
    if (req.body.password !== undefined && req.body.password.length) {
        fieldsToUpdate.password = req.body.password;
    }
    if (req.body.title !== undefined && req.body.title.length) {
        fieldsToUpdate.title = req.body.title;
    }
    if (req.body.url !== undefined && req.body.url.length) {
        fieldsToUpdate.url = req.body.url;
    }
    if (req.body.clientId !== undefined && req.body.clientId.length) {
        fieldsToUpdate.clientId = req.body.clientId;
    }
    if (req.body.secret !== undefined) {
        fieldsToUpdate.secret = req.body.secret;
    }

    Site.update({_id: req.params.id}, fieldsToUpdate,
        function (err, num, raw) {
            if (err)
                res.send(err);

            res.json(req.body);
        });
};

// Create endpoint /api/sites/:site_id for DELETE
exports.deleteSite = function (req, res) {
    Site.remove({_id: req.params.id}, function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Site removed!'});
    });
};