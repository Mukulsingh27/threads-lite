import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Read the .env file
dotenv.config();

// User Modal
const User = mongoose.model('User');
const Quote = mongoose.model('Quote');

const resolvers = {
	Query: {
		users: async () => await User.find({}),
		user: async (_, { _id }) => await User.findOne({ _id }),
		quotes: async (_, { page = 1, pageSize = 10 }) => {
			const offset = (page - 1) * pageSize;
			const quotes = await Quote.find({})
				.sort({ createdAt: -1 })
				.skip(offset)
				.limit(pageSize)
				.populate('by', '_id firstName lastName profileImage');
			return quotes;
		},
		quote: async (_, { by }) => await Quote.find({ by }),
		myProfile: async (_, __, { userID }) => {
			if (!userID) throw new Error('You are not authenticated !! !!');
			return await User.findOne({ _id: userID });
		},
	},
	User: {
		quotes: async (parent) => await Quote.find({ by: parent._id }),
	},
	Mutation: {
		signUpUser: async (_, { newUser }) => {
			const user = await User.findOne({ email: newUser.email });

			// Check if user already exists
			if (user) throw new Error('User already exists');

			// Hash the password
			const hashedPassword = await bcrypt.hash(newUser?.password, 10);

			// Create new user
			const newUSer = await new User({
				...newUser,
				profileImage: `https://robohash.org/${newUser.firstName.toLowerCase()}?size=300x300`,
				password: hashedPassword,
			});

			return newUSer.save();
		},
		signInUser: async (_, { userSignIn }) => {
			const user = await User.findOne({ email: userSignIn.email });

			// Check if user exists
			if (!user) throw new Error('User does not exists');

			// Compare password
			const passMatch = await bcrypt.compare(
				userSignIn.password,
				user.password
			);

			// Check if password matches
			if (!passMatch)
				throw new Error('Either email or password is incorrect');

			// Create token
			const token = jwt.sign(
				{ userID: user._id },
				process.env.JWT_SECRET_KEY
			);

			return { token };
		},
		deleteUserWithQuotes: async (_, { _id }, { userID }) => {
			// Check if user is authenticated
			if (!userID) throw new Error('You are not authenticated');

			// Find and delete the user
			const findAndDelete = await User.findByIdAndDelete(_id);

			// Check if user exists
			if (!findAndDelete) throw new Error('User does not exists');

			// Delete all quotes by the user
			await Quote.deleteMany({ by: _id });

			// Return success message
			return 'User deleted successfully';
		},
		createQuote: async (_, { name }, { userID }) => {
			if (!userID) throw new Error('You are not authenticated');

			const newQuote = new Quote({
				name,
				by: userID,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
			await newQuote.save();

			return 'Quote created successfully';
		},
		updateQuote: async (_, { _id, name }, { userID }) => {
			if (!userID) throw new Error('You are not authenticated');

			// Find and update the quote
			const findAndUpdate = await Quote.findByIdAndUpdate(_id, {
				name,
				updatedAt: new Date().toISOString(),
			});

			if (!findAndUpdate) throw new Error('Quote does not exists');

			// Return success message
			return 'Quote updated successfully';
		},
		deleteQuote: async (_, { _id }, { userID }) => {
			// Check if user is authenticated
			if (!userID) throw new Error('You are not authenticated');

			// Find and delete the quote
			const findAndDelete = await Quote.findByIdAndDelete(_id);

			// Check if quote exists
			if (!findAndDelete) throw new Error('Quote does not exists');

			// Return success message
			return 'Quote deleted successfully';
		},
	},
};

export default resolvers;
