const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const Viewer = require("../models/viewer");



describe('Integration tests for Viewers', () => {

  it('should GET /viewerLogin',async()=>{
    let res = await chai
      .request(app)
      .get('/authRoutes/viewerLogin')
      .send({})

    expect(res.status).to.equal(200);
  });


  it('should POST /viewerSignup for new Viewer',async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/viewerSignup')
      .send({
          name       :'Viewer',
          email      :'viewer@email.com',
          password   :'password',
          rePassword :'password'})

    expect(res.status).to.equal(201);
  });


  it('should POST /viewerSignup for new Viewer but passwords dont match',async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/viewerSignup')
      .send({
          name       :'Viewer',
          email      :'viewer@email.com',
          password   :'password',
          rePassword :'rePassword'})

    expect(res.status).to.equal(400);
  });


  it('should POST /viewerSignup for new Viewer but invalid email',async()=>{
    const name = 'Viewer';
    const email = 'viewer@email.com';
    const password = 'password';
    const viewerCreate = await Viewer.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/viewerSignup')
      .send({
          name       :'Viewer',
          email      :'',
          password   :'password',
          rePassword :'password'})

    expect(res.status).to.equal(400);
  });



  it('should POST /viewerLogin to login Viewer',async()=>{
    const name = 'Viewer';
    const email = 'viewer@email.com';
    const password = 'password';
    const viewerCreate = await Viewer.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/viewerLogin')
      .send({
          email      :'viewer@email.com',
          password   :'password'})

    expect(res.status).to.equal(200);
  });


  it('should POST /viewerLogin to login Viewer with incorrect email',async()=>{
    const name = 'Viewer';
    const email = 'viewer@email.com';
    const password = 'password';
    const viewerCreate = await Viewer.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/viewerLogin')
      .send({
          email      :'incorrect@email.com',
          password   :'password'})

    expect(res.status).to.equal(400);
  });


  it('should create a Viewer and then log them in',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const viewerCreate = await Viewer.create({ name, email, password });

    const viewer = await Viewer.login('test@email.com', 'password');
    expect(viewer.email).to.equal('test@email.com');
  });

  it('should create a User and then login with incorrect email',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const viewerCreate = await Viewer.create({ name, email, password });

    try {
      const viewer = await Viewer.login('wrong@email.com', 'password');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect email');
    }
  });

  it('should create an User and then login with incorrect password',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const viewerCreate = await Viewer.create({ name, email, password });

    try {
      const viewer = await Viewer.login('test@email.com', 'incorrectPassword');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect password');
    }
  });


});
