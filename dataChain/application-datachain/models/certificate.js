const mongoose = require('mongoose');
Schema = mongoose.Schema;



// Create a schema
const certificateSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Please enter a certificate title'],
	},

	type: {
		type: String,
		required: [true, 'Please enter a degree type'],
	},

	date_awarded: {
		type: Date,
		default: Date.now,
	},

	grade: {
		type: String,
		required: [true, 'Please enter a grade'],
	},

	department: [{
		type: Schema.Types.ObjectId, ref: 'Department'
	}],

	recipient: [{
		type: Schema.Types.ObjectId, ref: 'User'
	}],

	accreditor: [{
		type: Schema.Types.ObjectId, ref: 'Accreditor'
	}]
});





// Create the model
const certificateModel = mongoose.model('Certificate', certificateSchema);

// Export the model
module.exports = certificateModel;


