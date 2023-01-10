if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { requireAuth, checkUser, checkAccreditor, checkViewer, checkDepartment } = require('./middleware/authMiddleware');
const { fabric_initial_connection } = require('./controllers/hyperledgerController');


const dbURI = 'mongodb+srv://joethompson:Thojoe12@cluster0.sw8hl.mongodb.net/datachain';
mongoose.connect(dbURI, { useUnifiedTopology: true })
	.then((result) => app.listen(process.env.PORT || 3000))
	.catch((err) => console.log(err));


// Create the initial fabric connection profile and initialises blockchain network with certificates
fabric_initial_connection(); 


const homeRouter = require('./routes/homeRoutes');
const aboutRouter = require('./routes/about');
const certificateRouter = require('./routes/newCertificateRoutes');
const authRouter = require('./routes/authRoutes');
const accountRouter = require('./routes/accountRoutes');

// Set Templating Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: false })); // limit: '10mb'
app.use(cookieParser());
app.use(express.json());





// Load all mongoose models
require('./models/user');
require('./models/certificate');
require('./models/accreditor');
require('./models/viewer');
require('./models/department');

// Static Files
app.get('*', checkUser, checkAccreditor, checkViewer, checkDepartment);
app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/authRoutes', authRouter);
app.use('/accountRoutes', accountRouter);
app.use('/newCertificateRoutes', certificateRouter);


module.exports = app;