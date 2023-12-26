import mongoose from 'mongoose';

const userVerificationSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 600, // 10 minutes.
	},
});

mongoose.model('UserVerification', userVerificationSchema);
