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

describe('Client API Test', () =>
{
    beforeEach((done) =>
    {
        done();
    });
    
    
    /*
     * Test the /GET route
     */
    describe('/GET clients', () =>
    {
        it('it should GET all the clients', (done) =>
        {
            chai.request(server)
                .get('/api/clients/')
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
    describe('/POST client', () =>
    {
        it('it should POST a new clients entry', (done) =>
        {
            let client = {
                username: "tester-fritz",
                password: "pwd1234",
                email: "init@tester.ch"
            };
            chai.request(server)
                .post('/api/clients')
                .send(client)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    testId = res.body.data._id;
                    assert(res.body.data.email === 'init@tester.ch', 'saved email is wrong');
                    res.body.should.be.a('object');
                    done();
                });
        });
        
    });
    
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id client', () =>
    {
        it('it should UPDATE an client entry by a given id', (done) =>
        {
            let client = {
                email: "emailchanged@tester.ch",
                username: "tester-hans",
                password: "123456"
            };
            chai.request(server)
                .put('/api/clients/' + testId)
                .send(client)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
    describe('/GET/:id client', () =>
    {
        it('it should GET a client entry by the given id', (done) =>
        {
            
            chai.request(server)
                .get('/api/clients/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    res.body[0].should.have.property('_id').eql(testId);
                    assert(res.body[0].email === 'emailchanged@tester.ch', 'updated email is wrong');
                    done();
                });
            
            
        });
    });
    
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id client', () =>
    {
        it('it should DELETE a client given the id', (done) =>
        {
            chai.request(server)
                .delete('/api/clients/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
});