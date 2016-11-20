var Site = require('../models/site');

// Create endpoint /api/sites for POST
exports.postSite = function(req, res) {
    var site = new Site();

    site.id = req.body._id;
    site.clientId = req.body.clientId;
    site.title = req.body.title;
    site.secret = req.body.secret;

    site.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'New Site added', data: site });
    });
};

// Create endpoint /api/sites for GET
exports.getSites= function(req, res) {
    Site.find(function(err, sites) {
        if (err)
            res.send(err);

        var result = {"data": sites};
        res.json(result);
    });
};

// Create endpoint /api/sites/:site_id for GET
exports.getSite = function(req, res) {
    Site.find({_id: req.params.id }, function(err, site) {
        if (err)
            res.send(err);

        res.json(site);
    });
};


// Create endpoint /api/sites/:id for PUT
exports.putSite = function(req, res) {
    Site.update(
        {
            _id: req.params.id
        },
        {
            title: req.body.title, //TODO wie können Daten beim RequestType application/json gelesen werden?
            secret: req.body.secret
        },
        function(err, num, raw) {
            if (err)
                res.send(err);

            res.json(req.body);
        });
};

// Create endpoint /api/sites/:site_id for DELETE
exports.deleteSite = function(req, res) {
    Site.remove({_id: req.params.id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Site removed!' });
    });
};