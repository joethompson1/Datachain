const mongoose = require('mongoose');
Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


// Create a schema
const departmentSchema = new Schema({

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

	accreditor: [{
		type: Schema.Types.ObjectId, ref: 'Accreditor'
	}]
});


// fire a function before doc is daved to db
departmentSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


// static method to login department
departmentSchema.statics.login = async function(email, password) {
	const department = await this.findOne({ email })

	if (department) {
		const auth = await bcrypt.compare(password, department.password)

		if (auth) {
			return department;
		}
		throw Error('incorrect password')
	}
	throw Error('incorrect email');
}



// Create the model
const departmentModel = mongoose.model('Department', departmentSchema);

// Export the model
module.exports = departmentModel;


