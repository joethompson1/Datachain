const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const { requireAuth } = require('../middleware/authMiddleware');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const Certificate = require("../models/certificate");
const Accreditor = require("../models/accreditor");
const Department = require("../models/department");



describe('Integration tests for Department', () => {

  it('should POST /account to register a new Department',async()=>{
    let res = await chai
      .request(app)
      .post('/accountRoutes/account')
      .send({
          name       :'Department',
          email      :'department@email.com',
          password   :'password',
          rePassword :'password',
          walletId   :'6240c6dc8566be4ff1946864'})

    expect(res.status).to.equal(201);
  });


  it('should POST /account to register a new Department but passwords do not match',async()=>{
    let res = await chai
      .request(app)
      .post('/accountRoutes/account')
      .send({
          name       :'Department',
          email      :'department@email.com',
          password   :'password',
          rePassword :'No Match',
          walletId   :'6240c6dc8566be4ff1946864'})

    expect(res.status).to.equal(400);
  });


  it('should POST /account to register a new Department but no email provided',async()=>{
    const name = 'Department';
    const email = 'department@email.com';
    const password = 'password';
    await Department.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/accountRoutes/account')
      .send({
          name       :'Department',
          email      :'',
          password   :'password',
          rePassword :'password',
          walletId   :'6240c6dc8566be4ff1946864'})

    expect(res.status).to.equal(400);
  });



  it('should POST /universityLogin for Department',async()=>{
    const name = 'Department';
    const email = 'department@email.com';
    const password = 'password';

    await Department.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/authRoutes/universityLogin')
      .send({
          email      :'department@email.com',
          password   :'password'})

    expect(res.status).to.equal(200);
  });

  it('should POST /departmentLogin for Department',async()=>{
    const name = 'Department';
    const email = 'department@email.com';
    const password = 'password';

    await Department.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/accountRoutes/departmentLogin')
      .send({
          email      :'department@email.com',
          password   :'password'})

    expect(res.status).to.equal(200);
  });

  it('should POST /departmentLogin for Department where Deparment doesnt exist',async()=>{
    const name = 'Department';
    const email = 'department@email.com';
    const password = 'password';

    await Department.create({ name, email, password });

    let res = await chai
      .request(app)
      .post('/accountRoutes/departmentLogin')
      .send({
          email      :'null@email.com',
          password   :'password'})

    expect(res.status).to.equal(400);
  });


  it('should create a Department and then log them in',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const departmentCreate = await Department.create({ name, email, password });

    const department = await Department.login('test@email.com', 'password');
    expect(department.email).to.equal('test@email.com');
  });

  it('should create a Department and then login with incorrect email',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const departmentCreate = await Department.create({ name, email, password });

    try {
      const department = await Department.login('incorrect@email.com', 'password');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect email');
    }
  });

  it('should create an Department and then login with incorrect password',async()=>{
    const name = 'test';
    const email = 'test@email.com';
    const password = 'password';
    const departmentCreate = await Department.create({ name, email, password });

    try {
      const department = await Department.login('test@email.com', 'incorrectPassword');
    } catch (err) {
      expect(err.toString()).to.equal('Error: incorrect password');
    }
  });
});
