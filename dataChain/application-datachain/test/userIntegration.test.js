const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');

const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require("../models/user");



describe('Integration tests for Users', () => {

  it('should GET /signup',async()=>{
    let res = await chai
      .request(app)
      .get('/authRoutes/signup')
      .send({})

    expect(res.status).to.equal(200);
  });


  it('should GET /logout',async()=>{
    let res = await chai
      .request(app)
      .get('/authRoutes/logout')
      .send({})

    expect(res.status).to.equal(200);
  });

  it('should POST /signup a new User',async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/signup')
      .send({
          name       :'User',
          email      :'user@email.com',
          password   :'password',
          rePassword :'password'})

    expect(res.status).to.equal(201);
  });

  it('should POST /login User',async()=>{
    const name = 'User';
    const email = 'user@email.com';
    const password = 'password';

    const userCreate = await User.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/login')
      .send({
          email      :'user@email.com',
          password   :'password'})

    expect(res.status).to.equal(200);
  });



  it('should POST /login User with incorrect password',async()=>{
    const name = 'User';
    const email = 'user@email.com';
    const password = 'password';

    const userCreate = await User.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/login')
      .send({
          email      :'user@email.com',
          password   :'incorrectPassword'})

    expect(res.status).to.equal(400);
  });

  it('should POST /signup for User but fail registering a user when no email is provided', async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/signup')
      .send({
          name       :'User',
          email      :'',
          password   :'password',
          rePassword :'password'})

    expect(res.status).to.equal(400);
  });


  it('should POST /signup a new User where password and rePassword do not match',async()=>{
    let res = await chai
      .request(app)
      .post('/authRoutes/signup')
      .send({
          name       :'User',
          email      :'user@email.com',
          password   :'password',
          rePassword :'rePassword'})

    expect(res.status).to.equal(400);

  });


  it('should create a User and then log them in',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const userCreate = await User.create({ name, email, password });

    const user = await User.login('test@email.com', 'password');
    expect(user.email).to.equal('test@email.com');
  });

  it('should create a User and then login with incorrect email',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const userCreate = await User.create({ name, email, password });

    try {
      const user = await User.login('wrong@email.com', 'password');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect email');
    }
  });

  it('should create an User and then login with incorrect password',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const userCreate = await User.create({ name, email, password });

    try {
      const user = await User.login('test@email.com', 'incorrectPassword');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect password');
    }
  });
});
