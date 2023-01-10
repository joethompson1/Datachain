const mongoose = require('mongoose');
Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



// Create a schema
const moduleSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please enter a module name']
	},

	code: {
		type: String,
		required: [true, 'Please enter a course code']
	},

	credits: {
		type: Number,
		required: [true, 'Please enter the number of credits the module is worth']
	},

	final_mark: {
		type: Number,
		required: false
	},

	year_taken: {
		type: Number,
		required: [true, 'Please enter the year the module was taken']
	},

	supporting_docs: {
		type: [String],
		required: false
	}

});




// Create the model
const moduleModel = mongoose.model('Module', moduleSchema);

// Export the model
module.exports = moduleModel;


