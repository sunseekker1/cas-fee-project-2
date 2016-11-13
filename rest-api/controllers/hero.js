var Hero = require('../models/hero');

// Create endpoint /api/heros for POST
exports.postHero = function(req, res) {
    var hero = new Hero();

    hero.id = req.body.id;
    hero.name = req.body.name;

    hero.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Hero added', data: hero });
    });
};

// Create endpoint /api/heroes for GET
exports.getHeroes= function(req, res) {
    Hero.find(function(err, heroes) {
        if (err)
            res.send(err);

        var result = {"data": heroes}; //TODO RestService liefert keine Ergebnisse?
        res.json(result);
    });
};

// Create endpoint /api/heroes/:hero_id for GET
exports.getHero = function(req, res) {
    Hero.find({id: req.params.id }, function(err, hero) {
        if (err)
            res.send(err);

        res.json(hero);
    });
};


// Create endpoint /api/heroes/:hero_id for PUT
exports.putHero = function(req, res) {
    Hero.update({ id: req.params.id }, { title: req.body.name }, function(err, num) {
        if (err)
            res.send(err);

        res.json({ message: num + ' hero updated' });
    });
};

// Create endpoint /api/heroes/:hero_id for DELETE
exports.deleteHero = function(req, res) {
    Hero.remove({ id: req.params.id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Hero removed!' });
    });
};