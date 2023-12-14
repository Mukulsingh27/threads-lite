import { users, quotes } from './fake.js';
import MD5 from 'crypto-js/md5.js';

const resolvers = {
	Query: {
		users: () => users,
		user: (_, { id }) => users.find( user => user.id === id ),
		quotes: () => quotes,
		quote: (_, { by} ) => quotes.filter( quote => quote.by === by )
	},
	User: {
		quotes: ( parent ) => quotes.filter( quote => quote.by === parent.id )
	},
	Mutation: {
		createUser: ( _, { newUser } ) => {
			// Function to generate a new unique ID
			const id = Math.max( ...users.map( user => user.id ) ) + 1;

			// Function to create a hashed password using MD5
			const hashPassword = password => MD5( password ).toString();

			// hash the password
			newUser.password = hashPassword( newUser.password );

			// Push the new user to the users array
			users.push({
				id,
				...newUser,
			})

			// Return the newly created user
			return users.find( user => user.id === id );
		}
	}
}

export default resolvers;
