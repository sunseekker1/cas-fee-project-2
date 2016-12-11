process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Access = require('../models/access');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let assert = require('chai').assert;
let testId;

chai.use(chaiHttp);

describe('Client API Test', () =>
{
    beforeEach((done) =>
    {
        /*Access.remove({}, (err) => {
         done();
         })*/
        ;
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
                username: "fritz",
                password: "tester",
                email: "fritz@tester.ch"
            };
            chai.request(server)
                .post('/api/clients')
                .send(client)
                .end((err, res) =>
                {
                    console.log(res.body);
                    /*res.should.have.status(200);
                    
                    testId = res.body.data._id;
                    assert(res.body.data.email === 'fritz@tester.ch', 'saved site id is wrong');
                    res.body.should.be.a('object');*/
                    done();
                });
        });
        
    });
    
    
});