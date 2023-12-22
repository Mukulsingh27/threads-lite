import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema( {
	name: {
		type: String,
		required: true
	},
	by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: String,
		required: true
	},
	updatedAt: {
		type: Date,
		default: String,
		required: true
	}
} )

mongoose.model( 'Quote', quoteSchema );