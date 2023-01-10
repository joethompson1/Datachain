const Certificate = require("../models/certificate");
const User = require("../models/user");
const Accreditor = require("../models/accreditor");
const Viewer = require("../models/viewer");
const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { readAsset, update_certificate } = require('../controllers/hyperledgerController');






// controller actions
module.exports.home_get = async (req, res) => {
	requestTime = Date.now();
	numberUsers = await User.countDocuments({});
	numberViewers = await Viewer.countDocuments({});
	numberAccreditors = await Accreditor.countDocuments({});
	
	res.status('200').render('home', {numberUsers: numberUsers, numberViewers: numberViewers, numberAccreditors: numberAccreditors});
};







