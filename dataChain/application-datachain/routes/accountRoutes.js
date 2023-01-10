const express = require('express');
const { Router } = require('express');
const User = require('../models/user');
const accountController = require('../controllers/accountController');
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');


const router = Router();


router.get('/account', requireAuth, accountController.account_get);
router.post('/account', authController.department_signup_post);
router.post('/departmentLogin', authController.department_login_post);
router.post('/share', accountController.shareCertificate_post); 
router.post('/createModule', accountController.createModule_post);
router.post('/addSupportingDoc', accountController.addSupportingDocs_post);
router.post('/editFinalMark', accountController.editFinalMark_post);
router.get('/enrollUniversity', requireAuth, accountController.enrollUniversity_get);
router.post('/enrollUniversity', accountController.enrollUniversity_post);

module.exports = router;











