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

describe('Admin API Test', () =>
{
    beforeEach((done) =>
    {
        done();
    });
    
    
    /*
     * Test the /GET route
     */
    describe('/GET admin', () =>
    {
        it('it should GET all the admins', (done) =>
        {
            chai.request(server)
                .get('/api/admins/')
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
    describe('/POST admin', () =>
    {
        it('it should POST a new admins entry', (done) =>
        {
            let admin = {
                username: "tester-admin",
                password: "pwd1234",
                email: "init@tester-admin.ch"
            };
            chai.request(server)
                .post('/api/admins')
                .set('Authorization', "Basic " + basicAuthUser)
                .send(admin)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    testId = res.body.data._id;
                    assert(res.body.data.email === 'init@tester-admin.ch', 'saved email is wrong');
                    res.body.should.be.a('object');
                    done();
                });
        });
        
    });
    
    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id admin', () =>
    {
        it('it should UPDATE an admin entry by a given id', (done) =>
        {
            let admin = {
                email: "emailchanged@tester-admin.ch",
                username: "tester-admin-2",
                password: "123456"
            };
            chai.request(server)
                .put('/api/admins/' + testId)
                .send(admin)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
            
        });
    });
    
    describe('/GET/:id admin', () =>
    {
        it('it should GET a admin entry by the given id', (done) =>
        {
            
            chai.request(server)
                .get('/api/admins/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    res.body[0].should.have.property('_id').eql(testId);
                    assert(res.body[0].email === 'emailchanged@tester-admin.ch', 'updated email is wrong');
                    done();
                });
            
            
        });
    });
    
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id admin', () =>
    {
        it('it should DELETE a admin given the id', (done) =>
        {
            chai.request(server)
                .delete('/api/admins/' + testId)
                .set('Authorization', "Basic " + basicAuthUser)
                .end((err, res) =>
                {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    
});