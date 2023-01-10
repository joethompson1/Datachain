
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;


describe('GET /home', () => {
  it('should get home with status 200', done => {
    chai
      .request(app)
      .get('/home')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should get / with status 200', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});




