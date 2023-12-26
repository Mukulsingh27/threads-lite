import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import confirmation from './templates/confirmation.js';

// Read the .env file
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// Create the transporter
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_MAIL, // user email
		pass: process.env.SMTP_PASSWORD, // user app password
	},
});

// User Modal
const User = mongoose.model('User');
const Quote = mongoose.model('Quote');
const UserVerification = mongoose.model('UserVerification');

const resolvers = {
	Query: {
		users: async () => await User.find({}),
		user: async (_, { _id }) => await User.findOne({ _id }),
		quotes: async (_, { page = 1, pageSize = 10 }) => {
			const offset = parseInt(page - 1) * pageSize;
			const quotes = await Quote.find({})
				.sort({ createdAt: -1 })
				.skip(parseInt(offset))
				.limit(parseInt(pageSize))
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
			const newUSerData = await new User({
				...newUser,
				profileImage: `https://robohash.org/${newUser.firstName.toLowerCase()}?size=300x300`,
				password: hashedPassword,
			});

			// Save the user
			const savedUser = await newUSerData.save();

			// Create token
			const token = jwt.sign(
				{ email: newUser.email },
				process.env.JWT_SECRET_KEY,
				{ expiresIn: '10m' }
			);

			// Create new user verification
			const newUserVerification = new UserVerification({
				userID: savedUser._id,
				email: newUser.email,
				token,
			});

			// Save the user verification
			await newUserVerification.save();

			// Define the email
			var mailConfigs = {
				from: process.env.SMTP_MAIL,
				to: newUser.email,
				subject: 'Threads Lite: Email Confirmation',
				html: confirmation({
					name: newUser.firstName,
					link: process.env.CLIENT_URL + '/verify/' + token,
				}),
			};

			// Send the email
			await transporter.sendMail(mailConfigs, (error, info) => {
				if (error) {
					console.log(error);
					res.status(500).send('Something went wrong.');
				} else {
					console.log('Email sent successfully: ' + info.response);
					res.status(200).send('Email Sent');
				}
			});

			return savedUser;
		},
		signInUser: async (_, { userSignIn }) => {
			const user = await User.findOne({ email: userSignIn.email });

			// Check if user exists and is verified
			if (!user || !user.verified) {
				throw new Error(
					!user ? 'User does not exist' : 'User is not verified'
				);
			}

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
		verifyUser: async (_, { token }) => {
			// Check if token is present
			if (!token) return 'Token not found';

			// Verify the token
			const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

			// Check if user exists
			const userVerification = await UserVerification.findOne({
				email,
			});

			if (!userVerification) return 'User verification not found';

			// Check if user is already verified
			const verified = await User.findOne({ email, verified: true });

			if (verified) return 'User is already verified';

			// Update the user to verified and remove the auto-expiration
			await User.findOneAndUpdate(
				{ email },
				{ verified: true },
				{ new: true, useFindAndModify: false }
			);

			// Return a success message
			return 'User verified successfully';
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
