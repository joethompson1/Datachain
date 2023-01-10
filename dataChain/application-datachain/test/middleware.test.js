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
const Accreditor = require("../models/accreditor");
const Department = require("../models/department");



describe('Integration tests for Middleware', () => {
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
        return res;
      };

    it('should checkUser function',async()=>{
        
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlMmNjMmFkODQ1OTkxODc1YjRhNiIsImlhdCI6MTY0ODQ4NTA2OCwiZXhwIjoxNjQ4NzQ0MjY4fQ.q4KTFdEQ-xEZv6LobHxNK40IwQ-10f_nVzpMDfwUZ8Y';

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

        await authMiddleware.checkUser(req, res1);
        
      });


        it('should checkUser function but unable to decode token',async()=>{
        const token = 'notAUserToken';

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

        await authMiddleware.checkUser(req, res1);
        expect(res.locals.user).to.equal(undefined);
        
      });


      it('should checkAccreditor function',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFhMjhlY2Y4Y2FlOWFiYmQ4Nzg5NSIsImlhdCI6MTY0ODQ2ODYyMiwiZXhwIjoxNjQ4NzI3ODIyfQ.KU6Un3YPq79TRruTrM8y2BrvgRH8xOn882LVy6vwhU4';

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

        await authMiddleware.checkAccreditor(req, res1);
        
      });


        it('should checkAccreditor function but unable to decode token',async()=>{
        const token = 'notAnAccreditorToken';

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

        await authMiddleware.checkAccreditor(req, res1);
        expect(res.locals.user).to.equal(undefined);
        
      });



      it('should checkDepartment function',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlNmFjMWM0NTRlY2U5MTZiNTkwMiIsImlhdCI6MTY0ODQ4NjA2OSwiZXhwIjoxNjQ4NzQ1MjY5fQ.wHnXB2kpoqGsWlHp_UCyLTpzaAUs3pk0YaSv311ox00';

        let res1 = await chai
          .request(app)
          .post('/accountRoutes/account')
          .send({
              name       :'Department',
              email      :'department@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        await authMiddleware.checkDepartment(req, res1);
        
      });


      it('should checkDepartment function but unable to decode token',async()=>{
        const token = 'notADepartmentToken';

        let res1 = await chai
          .request(app)
          .post('/accountRoutes/account')
          .send({
              name       :'Department',
              email      :'department@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        await authMiddleware.checkDepartment(req, res1);
        expect(res.locals.user).to.equal(undefined);
        
      });


      it('should checkViewer function',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlNzgxNTg2OWRiYmY4OWI3Njg2MSIsImlhdCI6MTY0ODQ4NjI3NCwiZXhwIjoxNjQ4NzQ1NDc0fQ.0R5p0U2X0ilqE_FW7QAIafAbwpsJZXMOCC_QHC_ugH0';

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

        await authMiddleware.checkViewer(req, res1);
        
      });


      it('should checkViewer function but unable to decode token',async()=>{
        const token = 'notADepartmentToken';

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

        await authMiddleware.checkViewer(req, res1);
        expect(res.locals.viewer).to.equal(undefined);
        
      });



      it('should check requireAuth function for User',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlMmNjMmFkODQ1OTkxODc1YjRhNiIsImlhdCI6MTY0ODQ4NTA2OCwiZXhwIjoxNjQ4NzQ0MjY4fQ.q4KTFdEQ-xEZv6LobHxNK40IwQ-10f_nVzpMDfwUZ8Y';

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

        res1.locals = { user: 'user' };
        try {
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {
        }
      });



      it('should check requireAuth function for User with invalid token',async()=>{
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

        res1.locals = { user: 'user' };
        try {
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {
          expect(err.toString()).to.equal('TypeError: res.redirect is not a function');
        }
      });



      it('should check requireAuth function for Accreditor',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFhMjhlY2Y4Y2FlOWFiYmQ4Nzg5NSIsImlhdCI6MTY0ODQ2ODYyMiwiZXhwIjoxNjQ4NzI3ODIyfQ.KU6Un3YPq79TRruTrM8y2BrvgRH8xOn882LVy6vwhU4';

        let res1 = await chai
          .request(app)
          .post('/authRoutes/UniversitySignup')
          .send({
              name       :'Accreditor',
              email      :'accreditor@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { accreditor: 'accreditor' };
        try {
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {

        }
      });



      it('should check requireAuth function for Accreditor with invalid token',async()=>{
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
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {
          expect(err.toString()).to.equal('TypeError: res.redirect is not a function');
        }
      });




      it('should check requireAuth function for Department',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlNmFjMWM0NTRlY2U5MTZiNTkwMiIsImlhdCI6MTY0ODQ4NjA2OSwiZXhwIjoxNjQ4NzQ1MjY5fQ.wHnXB2kpoqGsWlHp_UCyLTpzaAUs3pk0YaSv311ox00';

        let res1 = await chai
          .request(app)
          .post('/accountRoutes/account')
          .send({
              name       :'Department',
              email      :'department@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { department: 'department' };
        try {
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {

        }
      });



      it('should check requireAuth function for Department with invalid token',async()=>{
        const token = "notAToken";

        let res1 = await chai
          .request(app)
          .post('/accountRoutes/account')
          .send({
              name       :'Department',
              email      :'department@email.com',
              password   :'password',
              rePassword :'password'})

        const req = mockRequest(token);
        const res = mockResponse();

        res1.locals = { department: 'department' };
        try {
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {
          expect(err.toString()).to.equal('TypeError: res.redirect is not a function');
        }
      });




      it('should check requireAuth function for Viewer',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDFlNzgxNTg2OWRiYmY4OWI3Njg2MSIsImlhdCI6MTY0ODQ4NjI3NCwiZXhwIjoxNjQ4NzQ1NDc0fQ.0R5p0U2X0ilqE_FW7QAIafAbwpsJZXMOCC_QHC_ugH0';

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
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {
        }
      });



      it('should check requireAuth function for Viewer with invalid token',async()=>{
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
          await authMiddleware.requireAuth(req, res1);
        } catch (err) {
          expect(err.toString()).to.equal('TypeError: res.redirect is not a function');
        }
      });


});