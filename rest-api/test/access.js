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

describe('Access', () =>
{
    beforeEach((done) =>
    {
        done();
    });
    
    
    /*
     * Test the /GET route
     */
    describe('/GET access', () =>
    {
        it('it should GET all the accesses', (done) =>
        {
            chai.request(server)
                .get('/api/accesses/')
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
    describe('/POST access', () =>
    {
        it('it should POST a new access entry', (done) =>
        {
            let access = {
                siteId: "testsiteid-123456",
                socketId: "testsocketid-123456",
                used: false
            };
            chai.request(server)
                .post('/api/accesses')
                .send(access)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    testId = res.body.data._id;
                    assert(res.body.data.siteId === 'testsiteid-123456', 'saved site id is wrong');
                    res.body.should.be.a('object');
                    done();
                });
        });
        
    });
    
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id access', () =>
    {
        it('it should UPDATE an access entry by a given id', (done) =>
        {
            let access = {
                used: "true"
            };
            chai.request(server)
                .put('/api/accesses/' + testId)
                .send({used: access.used})
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id access', () =>
    {
        it('it should GET a access entry by the given id', (done) =>
        {
            
            chai.request(server)
                .get('/api/accesses/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    res.body[0].should.have.property('_id').eql(testId);
                    assert.isTrue(res.body[0].used, 'check if used is true');
                    done();
                });
            
            
        });
    });
    
});