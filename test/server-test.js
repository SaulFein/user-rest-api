'use strict';
process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';
var server = require(__dirname + '/../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
var request = chai.request;
let mongoose = require('mongoose');
var port = 'localhost:3000';

// mongoose.connect(MONGOLAB_URI || 'mongodb://localhost/testdb')

describe('testing functionality of the server', function() {
  after((done) => {
    mongoose.connection.db.dropDatabase(() =>{
      done();
    });
  });
  // it('should GET', (done) => {
  //   request(port)
  //     .get('/public/login')
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.data).to.be.an('array');
  //       done();
  //     });
  // });

  it('should POST', (done) => {
    request(port)
      .post('/public/new-user')
      .send({name: 'testuser222', password: '123'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body._id).to.exist;//check for id
        done();
      });
  });

  it('should POST', (done) => {
    request(port)
      .post('/public/login')
      .auth('testuser222', '123')
      .end((err, res) => {
        console.log(res.body);
        expect(err).to.eql(null);
        expect(res.body.token).to.exist;
        done();
      });
  });


});
