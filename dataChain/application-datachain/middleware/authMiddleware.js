const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Accreditor = require('../models/accreditor');
const Department = require('../models/department');
const Viewer = require('../models/viewer');







const requireAuth = (req, res, next) => {
	// gets the json web token
	const token = req.cookies.jwt;

	// check json web token exists & is verified
	if (token && res.locals.user) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessuser', (err, decodedToken) => {
			// if unable to decode token take user to signup page
			if (err) {
				console.log(err.message);
				res.redirect('authRoutes/signup');

			} else {
				console.log(decodedToken);
				next();
			}
		});

	} else if (token && res.locals.accreditor) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessaccreditor', (err, decodedToken) => {
			// if unable to decode token take user to signup page
			if (err) {
				console.log(err.message);
				res.redirect('authRoutes/signup');

			} else {
				console.log(decodedToken.id);
				next();
			}
		});

	} else if (token && res.locals.department) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessdepartment', (err, decodedToken) => {
			// if unable to decode token take user to signup page
			if (err) {
				console.log(err.message);
				res.redirect('authRoutes/signup');

			} else {
				console.log(decodedToken.id);
				next();
			}
		});

	} else if (token && res.locals.viewer) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessviewer', (err, decodedToken) => {
			// if unable to decode token take user to signup page
			if (err) {
				console.log(err.message);
				res.redirect('authRoutes/signup');

			} else {
				console.log(decodedToken.id);
				next();
			}
		});

	} else {
		res.redirect('authRoutes/signup');
	}
}







// check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessuser', async (err, decodedToken) => {
			if (err) {
				console.log("Error22 (Unable to decode user token)");
				console.log(err.message);
				res.locals.user = null;
				next();

			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		console.log("No User Logged In");
		res.locals.user = null;
		next();
	}
}







// check current accreditor
const checkAccreditor = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessaccreditor', async (err, decodedToken) => {
			if (err) {
				console.log("Error22 (Unable to decode accreditor token)");
				console.log(err.message);
				res.locals.accreditor = null;
				next();

			} else {
				let accreditor = await Accreditor.findById(decodedToken.id);
				res.locals.accreditor = accreditor;
				next();
			}
		});

	} else {
		console.log("No Accreditor Logged In");
		res.locals.accreditor = null;
		next();
	}
}







// check current department
const checkDepartment = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessdepartment', async (err, decodedToken) => {
			if (err) {
				console.log("Error22 (Unable to decode department token)");
				console.log(err.message);
				res.locals.department = null;
				next();

			} else {
				let department = await Department.findById(decodedToken.id);
				res.locals.department = department;
				next();
			}
		});

	} else {
		console.log("No Department Logged In");
		res.locals.department = null;
		next();
	}
}







// check current user
const checkViewer = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessviewer', async (err, decodedToken) => {
			if (err) {
				console.log("Error22 (Unable to decode viewer token)");
				console.log(err.message);
				res.locals.viewer = null;
				next();

			} else {
				let viewer = await Viewer.findById(decodedToken.id);
				res.locals.viewer = viewer;
				next();
			}
		});

	} else {
		console.log("No Viewer Logged In");
		res.locals.viewer = null;
		next();
	}
}




module.exports = { requireAuth, checkUser, checkAccreditor, checkViewer, checkDepartment };


