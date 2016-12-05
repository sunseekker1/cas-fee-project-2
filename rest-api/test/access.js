process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Access = require('../models/access');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Access', () => {
    beforeEach((done) => {
        /*Access.remove({}, (err) => {
            done();
        })*/;
        done();
    });
    
    
    /*
     * Test the /GET route
     */
    describe('/GET access', () => {
        it('it should GET all the accesses', (done) => {
            chai.request(server)
                .get('/api/accesses/')
                .end((err, res) => {
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
    describe('/POST access', () => {
        it('it should POST a new access entry', (done) => {
            let access = {
                siteId: "testsiteid-123456",
                socketId: "testsocketid-123456",
                used: false
            };
            chai.request(server)
                .post('/api/accesses')
                .send(access)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        
    });
    
});