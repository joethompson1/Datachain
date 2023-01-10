const Certificate = require("../models/certificate");
const User = require("../models/user");
const Accreditor = require("../models/accreditor");
const Department = require("../models/department");
const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { create_certificate } = require('../controllers/hyperledgerController');



// Handle Errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { title: '',
				   type: '', 
				   recipient: '', 
				   grade: '',};

	return errors;
}

// controller actions
module.exports.newCertificate_get = async (req, res) => {
	var departments = [];
	var students = [];
	let accreditor;

	if (res.locals.department) {
		departments.push(res.locals.department.name);

		accreditor = await Accreditor.findOne({ _id: res.locals.department.accreditor })

	} else if (res.locals.accreditor) {
		accreditor = res.locals.accreditor;
		if (res.locals.accreditor.departments) {
			for (var i =0; i < res.locals.accreditor.departments.length; i++) {
				const department = await Department.findOne({ _id: res.locals.accreditor.departments[i] })
				departments.push(department.name);
			}
		}
	}

	if (accreditor) {
		for (var i=0; i < accreditor.students.length; i++) {
			const student = await User.findOne({ _id: accreditor.students[i] });

			if (student.certificates.length == 0 && !students.includes(student)) {
				students.push(student);
			}
		}
	}

	res.status(200).render('newCertificate', { departments: departments, students: students });
};






module.exports.newCertificate_post = async (req, res) => {
	try {

		let { title, recipients, grade, type, department }  = req.body;
		const token = req.cookies.jwt;
		let accreditorId = null;
		let departmentId = null;

		// check if department or accreditor/admin is issueing degree
		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessaccreditor', (err, decodedToken) => {
			if (err) {
				jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessdepartment', (err, decodedToken) => {
					if (err) {
						console.log(err.message);
					} else {
						departmentId = decodedToken.id
					}
				});
			} else {
				accreditorId = decodedToken.id;
			}
		});

		// if department is issueing degree
		if (accreditorId == null) {
			department = await Department.findOne({ _id: departmentId });
			const accreditor = await Accreditor.findOne({ _id: department.accreditor });
			accreditorId = accreditor._id.toString();
		}

		else {
			department = await Department.findOne({ name: department, accreditor: accreditorId })
		}


		for (var i=0; i < recipients.length; i++) {
			const user = await User.findOne({ _id: recipients[i] }).exec();

			const date = new Date();

			const certificate = await Certificate.create({  title: title,
															type: type,
															grade: grade,
															department: department._id,
															recipient: user._id,
															accreditor: accreditorId });



			User.findOneAndUpdate(
				   { _id: user._id }, 
				   { $push: { certificates: certificate } },
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
				   { $push: { certificates: certificate } },
					 function (error, success) {
					        if (error) {
					            console.log(error);
					        } else {
					            console.log(success);
					        }
			    	}
			);
			
			try {

				create_certificate(user._id, type, title, grade, accreditorId, date.toString()); // blockchain

			} catch (err) {
				console.log("Failed to create certificate on blockchain.");
			}

		}




		res.status(201).json({ certificate: certificate });


	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors: errors })
	}
};

