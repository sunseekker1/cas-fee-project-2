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

        res.json({ message: 'Site added', data: site });
    });
};

// Create endpoint /api/sites for GET
exports.getSites = function(req, res) {
    Site.find({ clientId: req.client._id }, function(err, sites) {
        if (err)
            res.send(err);

        res.json(sites);
    });
};

// Create endpoint /api/sites/:site_id for GET
exports.getSite = function(req, res) {
    Site.find({ clientId: req.client._id, _id: req.params.site_id }, function(err, site) {
        if (err)
            res.send(err);

        res.json(site);
    });
};


// Create endpoint /api/sites/:site_id for PUT
exports.putSite = function(req, res) {
    Site.update({ clientId: req.client._id, _id: req.params.site_id }, { title: req.body.title }, { secret: req.body.secret }, function(err, num, raw) {
        if (err)
            res.send(err);

        res.json({ message: num + ' site updated' });
    });
};

// Create endpoint /api/sites/:site_id for DELETE
exports.deleteSite = function(req, res) {
    Site.remove({ clientId: req.client._id, _id: req.params.site_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Site removed!' });
    });
};