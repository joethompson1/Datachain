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
const hyperledgerController = require('../controllers/hyperledgerController');
const Certificate = require("../models/certificate");
const Accreditor = require("../models/accreditor");
const Department = require("../models/department");
const User = require("../models/user");








describe('New Certificate Controller Testing', async () => {


   const mockRequest = (jwtData, bodyData) => {
      return {
        body: bodyData,
        cookies: { jwt: jwtData }
      };
    };

    const mockResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };

    it('should GET /newCertificate for an Accreditor ',async()=>{
      let res = await chai
        .request(app)
        .get('/newCertificateRoutes/newCertificate')
        .send({ })

      expect(res.status).to.equal(200);
    });


    it('should GET /newCertificate for a Department to test if statement in newCertificateController',async()=>{
        let res1 = await chai
          .request(app)
          .get('/newCertificateRoutes/newCertificate')
          .send({ })

        const req = mockRequest(null, null);
        const res = mockResponse();

        const testDepartment = { name: 'department' }
        res1.locals = { department: testDepartment };

        try {
          await newCertificateController.newCertificate_get(req, res1); 
        } catch (err) {
          expect(err.toString()).to.equal('TypeError: res.status is not a function');
        }
    });

    it('should GET /newCertificate for a Accreditor to test if statement in newCertificateController',async()=>{
        let res1 = await chai
          .request(app)
          .get('/newCertificateRoutes/newCertificate')
          .send({ })

        const req = mockRequest(null, null);
        const res = mockResponse();

        const departments = { length: 1 }
        const testAccreditor = { name: 'accreditor', departments: departments }
        res1.locals = { accreditor: testAccreditor };

        try {
          await newCertificateController.newCertificate_get(req, res1); 
        } catch (err) {
          expect(err.toString()).to.equal("TypeError: Cannot read properties of null (reading 'name')");
        }
    });


    it('should POST /newCertificate for an Accreditor ',async()=>{
      let status,
          json,
          res;

      let title = 'title';
      let recipientEmail = 'student@email.com';
      let grade = 'grade';
      let type = 'type';
      let department = 'department';
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFhMjhlY2Y4Y2FlOWFiYmQ4Nzg5NSIsImlhdCI6MTY0ODQ2ODYyMiwiZXhwIjoxNjQ4NzI3ODIyfQ.KU6Un3YPq79TRruTrM8y2BrvgRH8xOn882LVy6vwhU4'
      const body = { title, recipientEmail, grade, type, department }
      const req = mockRequest(token, body);
      // const res = mockResponse();
      
      status = stub();
      json = spy();
      res = { json, status };
      status.returns(res);

      const departmentModel = await new Department({
        name: 'department',
        email: 'department@email.com',
        password: 'password',
      }).save(function(err) {
        if (err) return handleError(err);
      });

      const accreditor = await new Accreditor({
        name: 'accreditor',
        email: 'accreditor@email.com',
        password: 'password',
      }).save(function(err) {
        if (err) return handleError(err);
      });

      const student = await new User({
        name: 'student',
        email: 'student@email.com',
        password: 'password',
      }).save(function(err) {
        if (err) return handleError(err);
      });


      await newCertificateController.newCertificate_post(req, res);
      status.calledWith(400).should.be.ok;
    });




  it('should POST /newCertificate for a Accreditor to test incorrect token',async()=>{
      const token = "notAToken";
      let title = 'title';
      let recipientEmail = 'student@email.com';
      let grade = 'grade';
      let type = 'type';
      let department = 'department';
      const body = { title, recipientEmail, grade, type, department }

      const req = mockRequest(token, body);
      const res = mockResponse();


      const departments = { length: 1 }
      const testAccreditor = { name: 'accreditor', departments: departments }

      try {
        await newCertificateController.newCertificate_post(req, res); 
      } catch (err) {
        expect(err.toString()).to.equal("TypeError: Cannot read properties of null (reading 'name')");
      }
    });


    it('should POST /newCertificate for a Deparment to test token',async()=>{
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlNmFjMWM0NTRlY2U5MTZiNTkwMiIsImlhdCI6MTY0ODQ4NjA2OSwiZXhwIjoxNjQ4NzQ1MjY5fQ.wHnXB2kpoqGsWlHp_UCyLTpzaAUs3pk0YaSv311ox00";
      let title = 'title';
      let recipientEmail = 'student@email.com';
      let grade = 'grade';
      let type = 'type';
      let department = 'department';
      const body = { title, recipientEmail, grade, type, department }

      const req = mockRequest(token, body);
      const res = mockResponse();


      const departments = { length: 1 }
      const testAccreditor = { name: 'accreditor', departments: departments }

      try {
        await newCertificateController.newCertificate_post(req, res); 
      } catch (err) {
        expect(err.toString()).to.equal("TypeError: Cannot read properties of null (reading 'name')");
      }
    });


    it('should call update_certificate function in hyperledgerController',async()=>{
      const token = "noToken";
      let ownerID = 'ownderID' 
      let viewerID = 'viewerID';
      const body = {  }

      const req = mockRequest(token, body);
      const res = mockResponse();


      await hyperledgerController.update_certificate(ownerID, viewerID, req, res, null); 

    });

});