process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Access = require('../models/access');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let assert = require('chai').assert;
let testId;
let basicAuthUser = new Buffer("testuser:123456").toString("base64");

chai.use(chaiHttp);

describe('SITE API Test', () =>
{
    beforeEach((done) =>
    {
        done();
    });
    
    
    /*
     * Test the /GET route
     */
    describe('/GET sites', () =>
    {
        it('it should GET all the sites', (done) =>
        {
            chai.request(server)
                .get('/api/sites/')
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.not.be.eql(0);
                    done();
                });
        });
    });
    
    /*
     * Test the /POST route
     */
    describe('/POST site', () =>
    {
        it('it should POST a new site entry', (done) =>
        {
            let site = {
                clientId: "test-123456",
                title: "test-sitetitle",
                secret: "12345"
            };
            chai.request(server)
                .post('/api/sites')
                .send(site)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    testId = res.body.data._id;
                    assert(res.body.data.title === 'test-sitetitle', 'saved title is wrong');
                    res.body.should.be.a('object');
                    done();
                });
        });
        
    });
    
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id site', () =>
    {
        it('it should UPDATE a site entry by a given id', (done) =>
        {
            let site = {
                clientId: "test-123456-changed",
                title: "test-sitetitle-changed",
                secret: "6789"
            };
            
            chai.request(server)
                .put('/api/sites/' + testId)
                .send(site)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
    describe('/GET/:id site', () =>
    {
        it('it should GET a site entry by the given id', (done) =>
        {
            
            chai.request(server)
                .get('/api/sites/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    res.body[0].should.have.property('_id').eql(testId);
                    assert(res.body[0].title === 'test-sitetitle-changed', 'updated title is wrong');
                    done();
                });
            
            
        });
    });
    
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id site', () =>
    {
        it('it should DELETE a site given the id', (done) =>
        {
            chai.request(server)
                .delete('/api/sites/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
});