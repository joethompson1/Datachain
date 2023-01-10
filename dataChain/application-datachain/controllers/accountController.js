const Certificate = require("../models/certificate");
const User = require("../models/user");
const Accreditor = require("../models/accreditor");
const Viewer = require("../models/viewer");
const Department = require("../models/department");
const Module = require("../models/module");
const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const { readAsset, update_certificate } = require('../controllers/hyperledgerController');




// Handle Errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = err;

	return errors;
}



// controller actions
module.exports.account_get = async (req, res) => {
	try {

		numberUsers = await User.countDocuments({});
		numberViewers = await Viewer.countDocuments({});
		numberAccreditors = await Accreditor.countDocuments({});

		// USER/STUDENT ACCOUNT
		if (res.locals.user) {
			const result = await readAsset(res.locals.user._id); // read from the blockchain
			const obj = null;
			userUniversityName = null;
			var year1Modules = [];
			var year2Modules = [];
			var year3Modules = [];
			let y1Marks = [];
			let y2Marks = [];
			let y3Marks = [];
			let y1Avg;
			let y2Avg;
			let y3Avg;

			const userUniversity = await Accreditor.findOne({ _id: res.locals.user.university });

			if (userUniversity) {
				userUniversityName = userUniversity.name;
			}

			const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

			if (res.locals.user.modules) {
				for (var i=0; i < res.locals.user.modules.length; i++) {
					const studentModule = await Module.findOne({ _id: res.locals.user.modules[i] })
					if (studentModule.year_taken == 1) {
						year1Modules.push(studentModule);
						if (studentModule.final_mark > 0) {
							y1Marks.push(studentModule.final_mark);
						}

					} else if (studentModule.year_taken == 2) {
						year2Modules.push(studentModule);
						if (studentModule.final_mark > 0) {
							y2Marks.push(studentModule.final_mark);
						}

					} else if  (studentModule.year_taken == 3) {
						year3Modules.push(studentModule);
						if (studentModule.final_mark > 0) {
							y3Marks.push(studentModule.final_mark);
						}
					}
				}

				y1Avg = average(y1Marks).toFixed(2);
				y2Avg = average(y2Marks).toFixed(2);
				y3Avg = average(y3Marks).toFixed(2);

				if (y1Avg == "NaN" ) {
					y1Avg = "--"
				}
				if (y2Avg == "NaN" ) {
					y2Avg = "--"
				}
				if (y3Avg == "NaN" ) {
					y3Avg = "--"
				}



			}

			if (result) {
				const obj = JSON.parse(result.toString());
				const accreditor = await Accreditor.findOne({ _id: obj.accreditor }).exec();
				const student = await User.findOne({ _id: obj.ownerID }).exec();
				res.status('200').render('account/studentAccount', {ownerID: obj.ownerID, degreeType: obj.degreeType, subject: obj.subject, 
																	classification: obj.classification, accreditor: accreditor, date: obj.Date, 
																	accreditorId: obj.accreditor, student: student, studentName: res.locals.user.name, 
																	studentEmail: res.locals.user.email, userUniversity: userUniversityName, year1Modules: year1Modules,
																	year2Modules: year2Modules, year3Modules: year3Modules, y1Avg: y1Avg, y2Avg: y2Avg, y3Avg: y3Avg, walletId: res.locals.user._id });
			}
			else {
				res.status('200').render('account/studentAccount', {ownerID: "", degreeType: "", subject: "", classification: "", accreditor: "", 
																	date: "", accreditorId: "", student: "", studentName: res.locals.user.name, 
																	studentEmail: res.locals.user.email, userUniversity: userUniversityName, year1Modules: year1Modules,
																	year2Modules: year2Modules, year3Modules: year3Modules, y1Avg: y1Avg, y2Avg: y2Avg, y3Avg: y3Avg, walletId: res.locals.user._id });
			}
		



		// ACCREDITOR ACCOUNT
		} else if (res.locals.accreditor || res.locals.department) {
			var certificateArray = [];

			if (res.locals.accreditor) {
				let accreditor = res.locals.accreditor;
				var departments = [];
				accreditor = await Accreditor.findOne({ _id: accreditor._id }).exec();
				numberDepartments = await Department.countDocuments({});
				const walletId = accreditor._id;

				if (numberDepartments > 0) {
					for (var i=0; i < accreditor.departments.length; i++) {
						const department = await Department.findOne({ _id: accreditor.departments[i] }).exec();
						const departmentName = department.name;
						departments.push(department);
					}
				}

				const certificateFind = await Certificate.find({ accreditor: accreditor._id }).clone();

				for (var i=0; i < certificateFind.length; i++) {
					const student = await User.findOne({ _id: certificateFind[i].recipient[0].toString() }).exec();
					const department = await Department.findOne({ _id: certificateFind[i].department[0].toString() }).exec();
					const accreditor = await Accreditor.findOne({ _id: certificateFind[i].accreditor[0].toString() }).exec();
					const studentName = student.name;	
					const departmentName = department.name;
					const accreditorName = accreditor.name;
					const date = certificateFind[i].date_awarded.toString().slice(0, 16);
					certificate = { title: certificateFind[i].title, grade: certificateFind[i].grade, department: departmentName, 
									studentName: studentName, accreditor: accreditorName, type: certificateFind[i].type, 
									date: date, accreditorId: certificateFind[i].accreditor[0].toString(), studentId: certificateFind[i].recipient[0].toString() }
					certificateArray.push(certificate);
				}

				res.status('200').render('account/accreditorAccount', {departments: departments, accreditor: accreditor, department: "", certificateArray: certificateArray, name: res.locals.accreditor.name, email: res.locals.accreditor.email, walletId: walletId });
			
			} else if (res.locals.department) {
				const department = res.locals.department;
				const walletId = department._id;

				const certificateFind = await Certificate.find({ department: department._id }).clone();

				for (var i=0; i < certificateFind.length; i++) {
					const student = await User.findOne({ _id: certificateFind[i].recipient[0].toString() }).exec();
					const department = await Department.findOne({ _id: certificateFind[i].department[0].toString() }).exec();
					const accreditor = await Accreditor.findOne({ _id: certificateFind[i].accreditor[0].toString() }).exec();
					const studentName = student.name;
					const departmentName = department.name;
					const accreditorName = accreditor.name;
					const date = certificateFind[i].date_awarded.toString().slice(0, 16);
					certificate = { title: certificateFind[i].title, grade: certificateFind[i].grade, department: departmentName, 
									studentName: studentName, accreditor: accreditorName, type: certificateFind[i].type, 
									date: date, accreditorId: certificateFind[i].accreditor[0].toString(), studentId: certificateFind[i].recipient[0].toString() }
					certificateArray.push(certificate);
				}

				res.status('200').render('account/accreditorAccount', {departments: "", accreditor: "", department: department, certificateArray: certificateArray, name: res.locals.department.name, email: res.locals.department.email, walletId: walletId  });
			} 





		// VIEWER ACCOUNT
		} else if (res.locals.viewer) {
			const viewer = res.locals.viewer;
			var certificateArray = [];

			for (var i=0; i < viewer.shared_certificates.length; i++) {
				const result = await readAsset(viewer.shared_certificates[i].toString()); // read from the blockchain
				const obj = JSON.parse(result.toString());
				obj.Date = obj.Date.slice(0,16);
				const accreditor = await Accreditor.findOne({ _id: obj.accreditor }).exec();
				const student = await User.findOne({ _id: obj.ownerID }).exec();
				obj.accreditor = accreditor 
				obj.student = student
				certificateArray.push(obj)
			}
			res.status('200').render('account/viewerAccount', {certificateArray: certificateArray, viewerName: res.locals.viewer.name, viewerEmail: res.locals.viewer.email });
		}

	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};


module.exports.shareCertificate_post = async (req, res) => {
	try {
		const { recipientEmail }  = req.body;
		let userID = null;
		const token = req.cookies.jwt;

		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessuser', (err, decodedToken) => {
			if (err) {
				console.log(err.message);
			} else {
				userID = decodedToken.id;
			}
		});

		let viewer = await Viewer.findOne({ email: recipientEmail }).exec();
		if (!viewer) {
			throw ("User Does Not Exist");
		}

		if (!viewer.shared_certificates.includes(userID)) {

			update_certificate(userID, viewer._id.toString()); // updates the certificate on the blockchain

			viewer.shared_certificates.push(userID);
			viewer.save();

			res.status(201).json({ viewer: viewer });

		 } else {
		 	res.status(400).json({ });
		 }


	} catch (err) {
		res.status(400).json({ err })
	}
};




module.exports.createModule_post = async (req, res) => {
	try {
		const { name, code, credits, finalMark, yearTaken, supportingDocs }  = req.body;
		let userID = null;
		const token = req.cookies.jwt;

		jwt.verify(token, 'ultralongsecretkeywhichnooneisabletoguessuser', (err, decodedToken) => {
			if (err) {
				console.log(err.message);
			} else {
				userID = decodedToken.id;
			}
		});

		const courseModule = await Module.create({  name: name,
													code: code,
													credits: credits,
													final_mark: finalMark,
													year_taken: yearTaken,
													supporting_docs: supportingDocs });

		User.findOneAndUpdate(
			   { _id: userID }, 
			   { $push: { modules: courseModule } },
				 function (error, success) {
				        if (error) {
				            console.log(error);
				        } else {
				            console.log(success);
				        }
		    	}
		);

		res.status(201).json({ module: courseModule });


	} catch (err) {
		res.status(400).json({ err })
	}
};




module.exports.addSupportingDocs_post = async (req, res) => {
	try {
		const { documentLink, moduleId }  = req.body;

		Module.findOneAndUpdate(
			   { _id: moduleId }, 
			   { $push: { supporting_docs: documentLink } },
				 function (error, success) {
				        if (error) {
				            console.log(error);
				        } else {
				            console.log(success);
				        }
		    	}
		);



		res.status(201).json({  });


	} catch (err) {
		res.status(400).json({ err })
	}
};



module.exports.editFinalMark_post = async (req, res) => {
	try {
		const { editFinalMarkInput, moduleID }  = req.body;

		Module.findOneAndUpdate(
			   { _id: moduleID }, 
			   { final_mark: editFinalMarkInput },
				 function (error, success) {
				        if (error) {
				            console.log(error);
				        } else {
				            console.log(success);
				        }
		    	}
		);



		res.status(201).json({  });


	} catch (err) {
		res.status(400).json({ err })
	}
};




module.exports.enrollUniversity_get = async (req, res) => {
	try {
		const numberAccreditors = await Accreditor.countDocuments({});
		accreditors = []

		for await (const accreditor of Accreditor.find()) {
		  accreditors.push(accreditor)
		}

		res.status(200).render('account/enrollUniversity', {studentName: res.locals.user.name, studentEmail: res.locals.user.email, ownerID: res.locals.user._id, accreditors: accreditors, university: res.locals.user.university } );


	} catch (err) {
		console.log("error: ", err);
		res.status(400).json({ err })
	}
};



module.exports.enrollUniversity_post = async (req, res) => {
	try {
		const { university, ownerID }  = req.body;

		const userId = ownerID;

		User.findOneAndUpdate(
			   { _id: userId }, 
			   { university: university } ,
				 function (error, success) {
				        if (error) {
				            console.log(error);
				        } else {
				            console.log(success);
				        }
		    	}
		);

		let accreditor = await Accreditor.findOne({ _id: university }).exec();

		if ( accreditor != null && accreditor.students.includes(userId)) {
			console.log("This student already exists!");
		} else {
			Accreditor.findOneAndUpdate(
				   { _id: university }, 
				   { $push: { students: userId } },
					 function (error, success) {
					        if (error) {
					            console.log(error);
					        } else {
					            console.log(success);
					        }
			    	}
			);
		}


		



		res.status(201).json({ });

	} catch (err) {
		console.log("error 400: ", err);
		res.status(400).json({ err });

	}
};




