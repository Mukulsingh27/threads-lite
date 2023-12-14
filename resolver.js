import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Read the .env file
dotenv.config();

// User Modal
const User = mongoose.model( 'User' );
const Quote = mongoose.model( 'Quote' );

const resolvers = {
	Query: {
		users: async () => await User.find({}),
		user: async (_, { _id }) => await User.findOne( { _id } ),
		quotes: async () => await Quote.find({}).populate( 'by', '_id firstName lastName' ),
		quote: async (_, { by } ) => await Quote.find( { by } )
	},
	User: {
		quotes: async ( parent ) => await Quote.find( { by: parent._id } )
	},
	Mutation: {
		signUpUser: async ( _, { newUser } ) => {
			const user = await User.findOne( { email: newUser.email } );

			// Check if user already exists
			if( user ) throw new Error( 'User already exists' );

			// Hash the password
			const hashedPassword = await bcrypt.hash( newUser?.password, 10 );

			// Create new user
			const newUSer = await new User( {
				...newUser,
				password: hashedPassword
			} );

			return newUSer.save();
		},
		signInUser: async ( _, { userSignIn } ) => {
			const user = await User.findOne( { email: userSignIn.email } );

			// Check if user exists
			if( ! user ) throw new Error( 'User does not exists' );
			
			// Compare password
			const passMatch = await bcrypt.compare( userSignIn.password, user.password );

			// Check if password matches
			if( !passMatch ) throw new Error( 'Either email or password is incorrect' );

			// Create token
			const token = jwt.sign( { userID : user._id }, process.env.JWT_SECRET_KEY )

			return { token };
		},
		createQuote: async ( _, { name }, { userID } ) => {
			if( ! userID ) throw new Error( 'You are not authenticated' );

			const newQuote = new Quote( {
				name,
				by: userID
			} );

			await newQuote.save();
			return 'Quote created successfully';
		}
	}
}

export default resolvers;
