const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');
const { spy, stub } = require('sinon');
// const test = require('ava');

const { requireAuth } = require('../middleware/authMiddleware');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const newCertificateController = require('../controllers/newCertificateController');
const Certificate = require("../models/certificate");
const Accreditor = require("../models/accreditor");
const Department = require("../models/department");
const User = require("../models/user");





describe('Integration tests for Accreditor',async () => {

  // AUTHCONTROLLER TESTING
  it('should POST /universitySignup for a new Accreditor',async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/universitySignup')
      .send({
          name       :'The University',
          email      :'university@email.com',
          password   :'password',
          rePassword :'password'})

    expect(res.status).to.equal(201);
  });


  it('should POST /universitySignup for a new Accreditor where passwords dont match',async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/universitySignup')
      .send({
          name       :'The University',
          email      :'university@email.com',
          password   :'password',
          rePassword :'rePassword'})

    expect(res.status).to.equal(400);
  });


  it('should POST /universitySignup for a new Accreditor whos email is already registered',async()=>{
    const name = 'University';
    const email = 'university@email.com';
    const password = 'password';
    await Accreditor.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/universitySignup')
      .send({
          name       :'The University',
          email      :'',
          password   :'password',
          rePassword :'password'})

    expect(res.status).to.equal(400);
  });


  it('should GET /universityLogin for Accreditor',async()=>{
    let res = await chai
      .request(app)
      .get('/authRoutes/universityLogin')
      .send({})

    expect(res.status).to.equal(200);
  });


  it('should POST /universityLogin for Accreditor',async()=>{
    const name = 'University';
    const email = 'university@email.com';
    const password = 'password';

    await Accreditor.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/universityLogin')
      .send({
          email      :'university@email.com',
          password   :'password'})

    expect(res.status).to.equal(200);
  });

  it('should POST /universityLogin for incorrect Accreditor/Department login',async()=>{
    const name = 'University';
    const email = 'university@email.com';
    const password = 'password';

    await Accreditor.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/universityLogin')
      .send({
          email      :'incorrect@email.com',
          password   :'password'})

    expect(res.status).to.equal(400);
  });



  // DATABASE TESTING
  it('should create an Accreditor and then log them in',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    await Accreditor.create({ name, email, password });

    const accreditor = await Accreditor.login('test@email.com', 'password');
    expect(accreditor.email).to.equal('test@email.com');
  });


  it('should create an Accreditor and then login with incorrect email',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    await Accreditor.create({ name, email, password });

    try {
      const accreditor = await Accreditor.login('incorrect@email.com', 'password');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect email');
    }
  });


  it('should create an Accreditor and then login with incorrect password',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    await Accreditor.create({ name, email, password });

    try {
      const accreditor = await Accreditor.login('test@email.com', 'incorrectPassword');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect password');
    }
  });




});