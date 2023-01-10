const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();


router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/universityLogin', authController.university_login_get);
router.post('/universityLogin', authController.univeristy_login_post);
router.post('/universitySignup', authController.university_signup_post);
router.get('/viewerLogin', authController.viewer_login_get);
router.post('/viewerLogin', authController.viewer_login_post);
router.post('/viewerSignup', authController.viewer_signup_post);


module.exports = router;