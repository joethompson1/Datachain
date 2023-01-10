const mongoose = require('mongoose');
Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


// Create a schema
const accreditorSchema = new Schema({

	name: {
		type: String,
		required: [true, 'Please enter a name']
	},

	email: {
		type: String,
		unique: true,
		required: [true, 'Please enter an email'],
		validate: [isEmail, 'Please enter a valid email'],
		lowercase: true
	},

	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimum password length is 6 characters']
	},

	image_file: {
		type: String,
		required: false,
		default: 'images/userA.svg'
	},

	certificates: [{
		type: Schema.Types.ObjectId, ref: 'Certificate'
	}],

	departments: [{
		type: Schema.Types.ObjectId, ref: 'Department'
	}],

	students: [{
		type: Schema.Types.ObjectId, ref: 'User'
	}]
});


// fire a function before doc is daved to db
accreditorSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


// static method to login accreditor
accreditorSchema.statics.login = async function(email, password) {
	const accreditor = await this.findOne({ email })

	if (accreditor) {
		const auth = await bcrypt.compare(password, accreditor.password)

		const salt = await bcrypt.genSalt();

		if (auth) {
			return accreditor;
		}
		throw Error('incorrect password')
	}
	throw Error('incorrect email');
}



// Create the model
const accreditorModel = mongoose.model('Accreditor', accreditorSchema);

// Export the model
module.exports = accreditorModel;


