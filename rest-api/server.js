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

if(process.env.NODE_ENV && process.env.NODE_ENV == "test") {
    process.env.PORT = 8081;
} else {
    process.env.PORT = 8080;
}

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json({
}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    var allowedOrigins = ['http://localhost:3000', 'http://localhost:3500'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
app.listen(process.env.PORT);
// export app for testing purposes
module.exports = app;