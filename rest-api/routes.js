var express = require('express');

function setup(handlers) {

    var router = express.Router();

    // Admins
    router.route('/admins')
        .get(handlers.adminController.getAdmins)
        .post(handlers.adminController.postAdmin);

    router.route('/admins/:id')
        .get(handlers.adminController.getAdmin)
        //.put(handlers.authController.isAuthenticated, handlers.adminController.putAdmin)
        .put(handlers.adminController.putAdmin)
        .delete(handlers.adminController.deleteAdmin);

    // Clients
    router.route('/clients')
        .get(handlers.clientController.getClients)
        .post(handlers.clientController.postClient);

    router.route('/clients/:id')
        .get(handlers.clientController.getClient)
        .put(handlers.clientController.putClient)
        .delete(handlers.clientController.deleteClient);

    // Sites
    router.route('/sites')
        .get(handlers.siteController.getSites)
        .post(handlers.siteController.postSite);

    router.route('/sites/:id')
        .get(handlers.siteController.getSite)
        .put(handlers.siteController.putSite)
        .delete(handlers.siteController.deleteSite);

    // Access
    router.route('/accesses')
        .get(handlers.accessController.getAccesses)
        .post(handlers.accessController.postAccess);

    router.route('/accesses/:id')
        .get(handlers.accessController.getAccess)
        .put(handlers.accessController.putAccess);

    // Heroes
    router.route('/heroes')
        .get(handlers.heroController.getHeroes)
        .post(handlers.heroController.postHero);

    router.route('/heroes/:id')
        .get(handlers.heroController.getHero)
        .put(handlers.heroController.putHero)
        .delete(handlers.heroController.deleteHero);

    return router;
}

exports.setup = setup;