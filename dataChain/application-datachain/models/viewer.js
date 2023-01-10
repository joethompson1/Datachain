const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
Schema = mongoose.Schema;


// Create a schema
const viewerSchema = new Schema({
	
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
		default: 'images/user.svg'
	},

	shared_certificates: [
		{ 
			type: Schema.Types.ObjectId, 
		  	ref: 'Certificate',
		}
	]
});


// fire a function before doc is daved to db
viewerSchema.pre('save', async function(next) {
	if (typeof this.__v == 'undefined') { // Only hashes password on first save
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
		next();
	}
});


// static method to login user
viewerSchema.statics.login = async function(email, password) {
	const viewer = await this.findOne({ email })

	if (viewer) {
		const auth = await bcrypt.compare(password, viewer.password)

		if (auth) {
			return viewer;
		}
		throw Error('incorrect password')
	}
	throw Error('incorrect email');
}


// Create the model
const viewerModel = mongoose.model('Viewer', viewerSchema);

// Export the model
module.exports = viewerModel;


