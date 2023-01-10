const User = require("../models/user");
const Accreditor = require("../models/accreditor");
const Viewer = require("../models/viewer");
const Department = require("../models/department");
const jwt = require('jsonwebtoken');
const { connect_user } = require('../controllers/hyperledgerController');
const openpgp = require('openpgp');





const maxAge = 3 * 24 * 60 * 60 // 3 days x 24 hours x 60 mins x 60 seconds
var passwordMatch = false;

const createTokenUser = (id) => {
	return jwt.sign({ id }, 'ultralongsecretkeywhichnooneisabletoguessuser', {
		expiresIn: maxAge // how long the token lasts before expires (requires it in seconds)
	});
}

const createTokenAccreditor = (id) => {
	return jwt.sign({ id }, 'ultralongsecretkeywhichnooneisabletoguessaccreditor', {
		expiresIn: maxAge // how long the token lasts before expires (requires it in seconds)
	});
}

const createTokenDepartment = (id) => {
	return jwt.sign({ id }, 'ultralongsecretkeywhichnooneisabletoguessdepartment', {
		expiresIn: maxAge // how long the token lasts before expires (requires it in seconds)
	});
}

const createTokenViewer = (id) => {
	return jwt.sign({ id }, 'ultralongsecretkeywhichnooneisabletoguessviewer', {
		expiresIn: maxAge // how long the token lasts before expires (requires it in seconds)
	});
}







// Handle Errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { name: '', 
				   email: '', 
				   password: '',
				   rePassword: ''};


	// incorrect email (login)
	if (err.message === 'incorrect email') {
		errors.email = 'that email is not registered';
	}

	// incorrect password
	if (err.message === 'incorrect password') {
		errors.password = 'that password is incorrect';
	}

	// duplicate error code
	if (err.code === 11000) {
		errors.email = 'that email is already registered';
		return errors;
	}

	if (err == 'Passwords do not match') {
		errors.rePassword = 'Passwords do not match';
		return errors;
	}

	// validation errors
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}

	// validation errors
	if (err.message.includes('Accreditor validation failed')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}

	// validation errors
	if (err.message.includes('Department validation failed')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}

	// validation errors
	if (err.message.includes('Viewer validation failed')) {
		Object.values(err.errors).forEach(({properties}) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
}


// controller actions
module.exports.signup_get = (req, res) => {
  res.status(200).render('login/login', { layout: 'layouts/login' })
}


module.exports.signup_post = async (req, res) => {
	const { name, email, password, rePassword }  = req.body;

	try {
		if (password === rePassword) {
			const user = await User.create({ name, email, password });

			connect_user(user._id); // Creates user on Hyperledger Fabric

			const token = createTokenUser(user._id);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });  // res.cookie(<cookieName>, <value>, {<options>})
			res.status(201).json({ user: user._id });

		} else {
			const errors = handleErrors('Passwords do not match');
			return res.status(400).json({ errors })
		}

	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });

	}
}




module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;

	try {

		const user = await User.login(email, password)
		const token = createTokenUser(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id })

	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
}



module.exports.logout_get = async (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.status(200).redirect('/home');
}



module.exports.university_login_get = async (req, res) => {
	res.status(200).render('login/universityLogin', { layout: 'layouts/universityLogin' });
}

module.exports.univeristy_login_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const accreditor = await Accreditor.login(email, password)
		const token = createTokenAccreditor(accreditor._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ accreditor: accreditor._id });

	} catch (err) {
	
		try {
			const department = await Department.login(email, password)
			const token = createTokenDepartment(department._id);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(200).json({ department: department._id });

		} catch (err) {
			const errors = handleErrors(err);
			res.status(400).json({ errors });
		}
	}
}



module.exports.university_signup_post = async (req, res) => {
	const { name, email, password, rePassword }  = req.body;

	try {
		if (password === rePassword) {
			const accreditor = await Accreditor.create({ name, email, password });

			connect_user(accreditor._id); // Creates user on Hyperledger Fabric

			const token = createTokenAccreditor(accreditor._id);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(201).json({ accreditor: accreditor._id });

		} else {
			const errors = handleErrors('Passwords do not match');
			return res.status(400).json({ errors })
		}

	} catch (err) {
		const errors = handleErrors(err);
		console.log(errors);
		res.status(400).json({ errors });
	}
}


module.exports.department_login_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		res.cookie('jwt', '', { maxAge: 1 });
		const department = await Department.login(email, password)
		const token = createTokenDepartment(department._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ department: department._id });

	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
}



module.exports.department_signup_post = async (req, res) => {
	const { name, email, password, rePassword, walletId }  = req.body;

	try {
		let accreditorId = walletId;

		if (password === rePassword) {
			const department = await Department.create({ name, email, password })

			Department.findOneAndUpdate(
			   { _id: department._id }, 
			   { $push: { accreditor: accreditorId  } },
				 function (error, success) {
				        if (error) {
				            console.log(error);
				        } else {
				            console.log(success);
				        }
		    	}
		   );

			Accreditor.findOneAndUpdate(
			   { _id: accreditorId }, 
			   { $push: { departments: department  } },
				 function (error, success) {
				        if (error) {
				            console.log(error);
				        } else {
				            console.log(success);
				        }
		    	}
		   );


			res.status(201).json({ department: department._id });

		} else {
			const errors = handleErrors('Passwords do not match');
			return res.status(400).json({ errors })
		}

	} catch (err) {
		console.log("Failed to create department");
		const errors = handleErrors(err);
		console.log(errors);
		res.status(400).json({ errors });
	}
}






module.exports.viewer_login_get = async (req, res) => {
	res.status(200).render('login/viewerLogin', { layout: 'layouts/viewerLogin' });
}

module.exports.viewer_login_post = async (req, res) => {
	const { email, password } = req.body;

	try {

		const viewer = await Viewer.login(email, password)
		const token = createTokenViewer(viewer._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ viewer: viewer._id })

	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
}






module.exports.viewer_signup_post = async (req, res) => {
	const { name, email, password, rePassword }  = req.body;

	try {
		if (password === rePassword) {

			const viewer = await Viewer.create({ name, email, password });

			connect_user(viewer._id); // Creates user on Hyperledger Fabric (creates wallet)

			const token = createTokenViewer(viewer._id);

			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });  // res.cookie(<cookieName>, <value>, {<options>})
			res.status(201).json({ viewer: viewer._id });

		} else {
			const errors = handleErrors('Passwords do not match');
			return res.status(400).json({ errors })
		}

	} catch (err) {
		const errors = handleErrors(err);
		console.log(errors);
		res.status(400).json({ errors });

	}
}










