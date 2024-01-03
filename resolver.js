import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import confirmation from './templates/confirmation.js';
import resetPassword from './templates/resetPassword.js';
import transporter from './nodemailer/transporter.js';
import { ApolloError } from 'apollo-server-core';
import e from 'express';

// Read the .env file
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// User Modal
const User = mongoose.model('User');
const Quote = mongoose.model('Quote');

// Resolvers
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
			if (!userID) throw new Error('You are not authenticated');
			return await User.findOne({ _id: userID });
		},
		fetchUsers: async (_, { query }) => {
			if (!query) throw new Error('Query not found');
			return await User.find({
				$or: [
					{ firstName: { $regex: query, $options: 'i' } },
					{ lastName: { $regex: query, $options: 'i' } },
					{ email: { $regex: query, $options: 'i' } },
				],
			}).limit(10);
		},
	},
	User: {
		quotes: async (parent) => await Quote.find({ by: parent._id }),
	},
	Mutation: {
		signUpUser: async (_, { newUser }) => {
			try {
				const user = await User.findOne({ email: newUser.email });

				// Check if user already exists
				if (user) throw new Error('User already exists!');

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

				// Send the email.
				await transporter.sendMail(mailConfigs, (error, info) => {
					if (error) {
						console.log(error);
						res.status(500).send(
							'Something went wrong with the confirmation email.'
						);
					} else {
						console.log(
							'Confirmation email sent successfully: ' +
								info.response
						);
						res.status(200).send('Email Sent');
					}
				});

				return savedUser;
			} catch (error) {
				console.error('Failed to sign up user');
				throw new ApolloError(error);
			}
		},
		signInUser: async (_, { userSignIn }) => {
			try {
				const user = await User.findOne({ email: userSignIn.email });

				// Check if user exists and is verified
				if (!user || !user.verified) {
					throw new Error(
						!user
							? 'User does not exists!'
							: 'User is not verified!'
					);
				}

				// Compare password
				const passMatch = await bcrypt.compare(
					userSignIn.password,
					user.password
				);

				// Check if password matches
				if (!passMatch) {
					throw new Error('Either email or password is incorrect');
				}

				// Create token
				const token = jwt.sign(
					{ userID: user._id },
					process.env.JWT_SECRET_KEY
				);

				// Optionally, you may return more information about the user
				return { token };
			} catch (error) {
				console.error('Failed to sign in user');
				throw new ApolloError(error);
			}
		},
		deleteUserWithQuotes: async (_, { _id }, { userID }) => {
			try {
				// Check if user is authenticated
				if (!userID) {
					throw new Error('You are not authenticated');
				}

				// Find and delete the user
				const deletedUser = await User.findByIdAndDelete(_id);

				// Check if user exists
				if (!deletedUser) {
					throw new Error('User does not exist');
				}

				// Delete all quotes by the user
				await Quote.deleteMany({ by: _id });

				// Optionally, you may return the deleted user object or a success message
				return {
					message: 'User deleted successfully',
					deletedUser,
				};
			} catch (error) {
				console.error('Failed to delete user');
				throw new ApolloError(error);
			}
		},
		verifyUser: async (_, { token }) => {
			try {
				// Check if token is present
				if (!token) {
					throw new Error('Token not found!');
				}

				// Verify the token
				const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

				// Find the user verification
				const userVerification = await User.findOne({ email });

				// Check if user verification exists
				if (!userVerification) {
					throw new Error('User does not exist!');
				}

				// Check if user is already verified
				const verified = await User.findOne({ email, verified: true });

				if (verified) {
					throw new Error('User is already verified!');
				}

				// Update the user to verified and remove the auto-expiration.
				await User.findOneAndUpdate(
					{ email },
					{
						verified: true,
						$unset: { createdAt: 1 },
					}
				);

				// Optionally, you may return the updated user object or a new token
				return 'User verified successfully!';
			} catch (error) {
				console.error('Failed to verify user');
				throw new ApolloError(error);
			}
		},
		resetPassword: async (_, { email }) => {
			try {
				if (!email) {
					throw new Error('Email not found!');
				}

				// Find the user
				const user = await User.findOne({ email });

				// Check if user exists
				if (!user) throw new Error('User does not exist!');

				// Don't send the email if the user is not verified
				if (!user.verified) {
					throw new Error('User is not verified!');
				}

				// Create token
				const token = jwt.sign(
					{ email: user.email },
					process.env.JWT_SECRET_KEY,
					{ expiresIn: '10m' }
				);

				// Define the email
				var mailConfigs = {
					from: process.env.SMTP_MAIL,
					to: user.email,
					subject: 'Threads Lite: Password Reset',
					html: resetPassword({
						name: user.firstName,
						link: process.env.CLIENT_URL + '/reset/' + token,
					}),
				};

				// Send the email
				await transporter.sendMail(mailConfigs, (error, info) => {
					if (error) {
						console.log(error);
						res.status(500).send(
							'Something went wrong with the password reset email.'
						);
					} else {
						console.log(
							'Password reset email sent successfully: ' +
								info.response
						);
						res.status(200).send('Email Sent');
					}
				});

				return 'Password reset link sent successfully, please check your email.';
			} catch (error) {
				console.error('Failed to reset password');
				throw new ApolloError(error);
			}
		},
		setNewPassword: async (_, { token, password }) => {
			try {
				if (!token) {
					throw new Error('Token not found!');
				}

				// Verify the token
				const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

				// Find the user
				const user = await User.findOne({ email });

				// Check if user exists
				if (!user) {
					throw new Error('User does not exist!');
				}

				// Hash the password
				const hashedPassword = await bcrypt.hash(password, 10);

				// Update the user password
				await User.findOneAndUpdate(
					{ email },
					{
						password: hashedPassword,
					}
				);

				// Return success message.
				return 'Password updated successfully!';
			} catch (error) {
				console.error('Failed to set new password');
				throw new ApolloError(error);
			}
		},
		createQuote: async (_, { name }, { userID }) => {
			try {
				// Check if user is authenticated
				if (!userID) {
					throw new Error('You are not authenticated');
				}

				// Create new quote
				const newQuote = new Quote({
					name,
					by: userID,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				});

				// Save the new quote
				await newQuote.save();

				// Return the created quote
				return 'Thread Posted Successfully';
			} catch (error) {
				// Handle specific errors if needed
				console.error('Failed to create quote');
				throw new ApolloError(error);
			}
		},
		updateQuote: async (_, { _id, name }, { userID }) => {
			try {
				// Check if user is authenticated
				if (!userID) {
					throw new Error('You are not authenticated');
				}

				// Find and update the quote
				const updatedQuote = await Quote.findByIdAndUpdate(
					_id,
					{
						name,
						updatedAt: new Date().toISOString(),
					},
					{ new: true } // Return the updated document
				);

				// Check if quote exists
				if (!updatedQuote) {
					throw new Error('Quote does not exist');
				}

				// Return success message
				return 'Thread updated successfully!';
			} catch (error) {
				// Handle specific errors if needed
				console.error('Failed to update quote');
				throw new ApolloError(error);
			}
		},
		deleteQuote: async (_, { _id }, { userID }) => {
			try {
				// Check if user is authenticated
				if (!userID) {
					throw new Error('You are not authenticated');
				}

				// Find and delete the quote
				const deletedQuote = await Quote.findByIdAndDelete(_id);

				// Check if quote exists
				if (!deletedQuote) {
					throw new Error('Quote does not exist');
				}

				// Return success message
				return 'Thread deleted successfully!';
			} catch (error) {
				// Handle specific errors if needed
				console.error('Failed to delete quote');
				throw new ApolloError(error);
			}
		},
	},
};

export default resolvers;
