const MONGODB = {
    user: "793965cada2d8ff8f5569e9170e62ee7",
    password: "casevenlogin",
    collection: "793965cada2d8ff8f5569e9170e62ee7"
};

const CONFIG = {
    // mongodbConnectionUrl: "mongodb://localhost:27017/cas-fee-project-2-rest-api",
    mongodbConnectionUrl: "mongodb://" + MONGODB.user + ":" + MONGODB.password + "@32-1a.mongo.evennode.com:27017/" + MONGODB.collection,
    allowedOrigins: ['http://localhost:3000', 'http://localhost:3500'],
    testport: 8081,
    port: 8080
};

module.exports = CONFIG;