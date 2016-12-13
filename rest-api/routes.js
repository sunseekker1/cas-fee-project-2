var express = require('express');

function setup(handlers) {

    var router = express.Router();

    // Admins
    router.route('/admins')
        .get(handlers.authController.isAuthenticated, handlers.adminController.getAdmins)
        .post(handlers.authController.isAuthenticated, handlers.adminController.postAdmin);

    router.route('/admins/:id')
        .get(handlers.authController.isAuthenticated, handlers.adminController.getAdmin)
        .put(handlers.authController.isAuthenticated, handlers.adminController.putAdmin)
        // .put(handlers.adminController.putAdmin)
        .delete(handlers.authController.isAuthenticated, handlers.adminController.deleteAdmin);

    router.route('/admins/login')
        .post(handlers.adminController.login);

    // Clients
    router.route('/clients')
        .get(handlers.authController.isAuthenticated, handlers.clientController.getClients)
        .post(handlers.authController.isAuthenticated, handlers.clientController.postClient);

    router.route('/clients/:id')
        .get(handlers.authController.isAuthenticated, handlers.clientController.getClient)
        .put(handlers.authController.isAuthenticated, handlers.clientController.putClient)
        .delete(handlers.authController.isAuthenticated, handlers.clientController.deleteClient);

    // Sites
    router.route('/sites')
        .get(handlers.authController.isAuthenticated, handlers.siteController.getSites)
        .post(handlers.authController.isAuthenticated, handlers.siteController.postSite);

    router.route('/sites/:id')
        .get(handlers.authController.isAuthenticated, handlers.siteController.getSite)
        .put(handlers.authController.isAuthenticated, handlers.siteController.putSite)
        .delete(handlers.authController.isAuthenticated, handlers.siteController.deleteSite);

    // Access
    router.route('/accesses')
        .get(handlers.authController.isAuthenticated, handlers.accessController.getAccesses)
        .post(handlers.accessController.postAccess);

    router.route('/accesses/:id')
        .get(handlers.authController.isAuthenticated, handlers.accessController.getAccess)
        .put(handlers.accessController.putAccess);

    return router;
}

exports.setup = setup;