import { users, quotes } from './fake.js';
import mongoose from 'mongoose';

// User Modal
const User = mongoose.model( 'User' );

const resolvers = {
	Query: {
		users: () => users,
		user: (_, { _id }) => users.find( user => user._id === _id ),
		quotes: () => quotes,
		quote: (_, { by} ) => quotes.filter( quote => quote.by === by )
	},
	User: {
		quotes: ( parent ) => quotes.filter( quote => quote.by === parent._id )
	},
	Mutation: {
		createUser: async ( _, { newUser } ) => {
			const user = await User.findOne( { email: newUser.email } );

			if( user ) throw new Error( 'User already exists' );

		}
	}
}

export default resolvers;
