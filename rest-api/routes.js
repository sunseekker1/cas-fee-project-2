var express = require('express');

function setup(handlers) {

    var router = express.Router();

    // Admins
    router.route('/admins')
        .get(handlers.adminController.getAdmins)
        .post(handlers.adminController.postAdmin);

    router.route('/admins/:admin_id')
        .get(handlers.adminController.getAdmin)
        .put(handlers.authController.isAuthenticated, handlers.adminController.putAdmin)
        .delete(handlers.authController.isAuthenticated, handlers.adminController.deleteAdmin);

    // Clients
    router.route('/clients')
        .get(handlers.clientController.getClients)
        .post(handlers.authController.isAuthenticated, handlers.clientController.postClient);

    router.route('/clients/:client_id')
        .get(handlers.clientController.getClient)
        .put(handlers.authController.isAuthenticated, handlers.clientController.putClient)
        .delete(handlers.authController.isAuthenticated, handlers.clientController.deleteClient);

    // Sites
    router.route('/sites')
        .get(handlers.siteController.getSites)
        .post(handlers.siteController.postSite);

    router.route('/sites/:site_id')
        .get(handlers.siteController.getSite)
        .put(handlers.authController.isAuthenticated, handlers.siteController.putSite)
        .delete(handlers.authController.isAuthenticated, handlers.siteController.deleteSite);

    // Access
    router.route('/access')
        .get(handlers.accessController.getAccesses)
        .post(handlers.authController.isAuthenticated, handlers.accessController.postAccess);

    router.route('/access/:access_id')
        .get(handlers.accessController.getAccess)
        .put(handlers.authController.isAuthenticated, handlers.accessController.putAccess);

    return router;
}

exports.setup = setup;