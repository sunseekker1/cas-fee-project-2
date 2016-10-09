var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var clientController = require('./controllers/client');
var adminController = require('./controllers/admin');
var siteController = require('./controllers/site');
var accessController = require('./controllers/access');
var passport = require('passport');
var authController = require('./controllers/auth');
var routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/cas-fee-project-2-rest-api');


// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

var routerHandlers = {
    authController: authController,
    adminController: adminController,
    clientController: clientController,
    siteController: siteController,
    accessController: accessController
};

var router = routes.setup(routerHandlers);


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);