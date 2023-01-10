const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;



describe('GET /about', () => {
  it('should render about page with status 200', done => {
    chai
      .request(app)
      .get('/about')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});