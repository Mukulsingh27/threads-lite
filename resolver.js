import { users, quotes } from './fake.js';

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
}

export default resolvers;
