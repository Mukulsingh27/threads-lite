import mongoose from 'mongoose';

const userSchema = new mongoose.Schema( {
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profileImage: {
		type: String,
		required: true
	},
} )

mongoose.model( 'User', userSchema );