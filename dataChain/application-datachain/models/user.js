const mongoose = require('mongoose');
Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



// Create a schema
const userSchema = new Schema({
	
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

	university: {
		type: Schema.Types.ObjectId,
		ref: 'Accreditor',
	},

	image_file: {
		type: String,
		required: false,
		default: 'images/user.svg'
	},

	certificates: [
		{ 
			type: Schema.Types.ObjectId, 
		  	ref: 'Certificate',
		}
	],

	modules: [
		{ 
			type: Schema.Types.ObjectId, 
		  	ref: 'Module',
		}
	]
});


// fire a function before doc is daved to db
userSchema.pre('save', async function(next) {
	if (typeof this.__v == 'undefined') { // Only hashes password on first save
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
		next();
	}
});


// static method to login user
userSchema.statics.login = async function(email, password) {
	const user = await this.findOne({ email })

	if (user) {
		const auth = await bcrypt.compare(password, user.password)

		if (auth) {
			return user;
		}
		throw Error('incorrect password')
	}
	throw Error('incorrect email');
}


// Create the model
const userModel = mongoose.model('User', userSchema);

// Export the model
module.exports = userModel;


