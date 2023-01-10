const { Router } = require('express');
const newCertificateController = require('../controllers/newCertificateController');

const router = Router();


router.get('/newCertificate', newCertificateController.newCertificate_get);
router.post('/newCertificate', newCertificateController.newCertificate_post);



module.exports = router;