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
const Viewer = require("../models/viewer");
const Module = require("../models/module");




describe('Integration tests for accountController',async () => {
	const mockRequest = (jwtData) => {
        return {
          cookies: { jwt: jwtData }
        };
      };

      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        res.locals = sinon.stub().returns(res);
        res.status = sinon.stub().returns(res);
        return res;
      };


      it('should GET /account for User',async()=>{
      	const token = "notAToken";

        let res1 = await chai
          .request(app)
          .post('/authRoutes/signup')
          .send({
              name       :'User',
              email      :'user@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { user: { name: 'User', modules: 'module' } };
        try {
          await accountController.account_get(req, res1);
        } catch (err) {
        }

	  });



	  it('should GET /account for Accreditor',async()=>{
      	const token = "notAToken";

        let res1 = await chai
          .request(app)
          .post('/authRoutes/universitySignup')
          .send({
              name       :'Accreditor',
              email      :'accreditor@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { accreditor: 'accreditor' };
        try {
          await accountController.account_get(req, res1);
        } catch (err) {
        }

	  });




	  it('should GET /account for Department',async()=>{
      	const token = "notAToken";

        let res1 = await chai
          .request(app)
          .post('/accountRoutes/accokunt')
          .send({
              name       :'Department',
              email      :'department@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { department: 'department' };
        try {
          await accountController.account_get(req, res1);
        } catch (err) {
        }

	  });



	  it('should GET /account for Viewer',async()=>{
      	const token = "notAToken";

        let res1 = await chai
          .request(app)
          .post('/authRoutes/viewerSignup')
          .send({
              name       :'Viewer',
              email      :'viewer@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { viewer: 'viewer' };
        try {
          await accountController.account_get(req, res1);
        } catch (err) {
        }

	  });


	 it('should POST /share to share certificate with Viewer that doesnt exist',async()=>{

		  const student = await new User({
	      name: 'student',
	      email: 'student@email.com',
	      password: 'password',
	    }).save(function(err) {
	      if (err) return handleError(err);
	    });	 

	    const viewer = await new Viewer({
	      name: 'viewer',
	      email: 'viewer@email.com',
	      password: 'password',
	    }).save(function(err) {
	      if (err) return handleError(err);
	    });	   

	    let res = await chai
	      .request(app)
	      .post('/accountRoutes/share')
	      .send({
	          recipientEmail: 'notexist@email.com'});

	    expect(res.status).to.equal(400);
	  });



   it('should POST /createModule to create module for User',async()=>{

      const student = await new User({
        name: 'student',
        email: 'student@email.com',
        password: 'password',
      }).save(function(err) {
        if (err) return handleError(err);
      }); 
   

      let res = await chai
        .request(app)
        .post('/accountRoutes/createModule')
        .send({
            name: 'module',
            code: 'code1234',
            credits: '10',
            finalMark: '69',
            yearTaken: '3',
            supportingDocs: 'www.supportingDocs.com',});

      expect(res.status).to.equal(201);
    });



   it('should POST /addSupportingDoc to update supporting Doc for User',async()=>{

      const studentModule = await new Module({
            name: 'module',
            code: 'code1234',
            credits: 10,
            yearTaken: 3,
      }).save(function(err) {
        if (err) return err;
      }); 
   

      let res = await chai
        .request(app)
        .post('/accountRoutes/addSupportingDoc')
        .send({
            documentLink: 'www.newurl.com',
            moduleId: null,
        });

      expect(res.status).to.equal(201);
    });



   it('should POST /editFinalMark to edit finalMark for User',async()=>{

      const studentModule = await new Module({
            name: 'module',
            code: 'code1234',
            credits: 10,
            yearTaken: 3,
      }).save(function(err) {
        if (err) return err;
      }); 
   

      let res = await chai
        .request(app)
        .post('/accountRoutes/editFinalMark')
        .send({
            documentLink: 69,
            moduleId: null,
        });

      expect(res.status).to.equal(201);
    });

   

   it('should GET /enrollUniversity page for User',async()=>{

      const token = "Token";

      let res1 = await chai
        .request(app)
        .post('/authRoutes/signup')
        .send({
            name       :'User',
            email      :'user@email.com',
            password   :'password',
            rePassword :'password'})

      const req = mockRequest(token);
      const res = mockResponse();

      res1.locals = { user: { name: 'User', modules: 'module' } };

      try {
          await accountController.enrollUniversity_get(req, res1);
      } catch (err) {
      }

    });



   it('should GET /enrollUniversity to enroll to university for User',async()=>{

      const student = await new User({
        name: 'student',
        email: 'student@email.com',
        password: 'password',
      }).save(function(err) {
        if (err) return handleError(err);
      }); 


      const accreditor = await new Accreditor({
        name       :'Accreditor',
        email      :'accreditor@email.com',
        password   :'password',
      }).save(function(err) {
        if (err) return handleError(err);
      }); 


      let res = await chai
        .request(app)
        .post('/accountRoutes/enrollUniversity')
        .send({});

      expect(res.status).to.equal(201);
    });




   // it('should POST /enrollUniversity to enroll to a university for a User',async()=>{

   //    const student = await new User({
   //      name: 'student',
   //      email: 'student@email.com',
   //      password: 'password',
   //    }).save(function(err) {
   //      if (err) return handleError(err);
   //    }); 


   //    const accreditor = await new Accreditor({
   //      name       :'Accreditor',
   //      email      :'accreditor@email.com',
   //      password   :'password',
   //    }).save(function(err) {
   //      if (err) return handleError(err);
   //    }); 
   
   //    const mongoose = require('mongoose');
   //    const id = mongoose.Types.ObjectId('converthistoId')
   //      .request(app)
   //      .post('/accountRoutes/enrollUniversity')
   //      .send({ university: 'univeristyId',
   //              ownerID: id });

   //    expect(res.status).to.equal(201);
   //  });




});