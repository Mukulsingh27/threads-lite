import mongoose from 'mongoose';

// Quote Modal
const quoteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
});

mongoose.model('Quote', quoteSchema);
