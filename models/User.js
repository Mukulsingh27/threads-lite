import mongoose from 'mongoose';

// User Modal
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profileImage: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		default: 'Hey there! I am using Threads Lite!',
	},
	verified: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 900, // 15 minutes
	},
});

mongoose.model('User', userSchema);
