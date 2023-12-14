import { gql } from 'apollo-server';

const typeDefs = gql`
	type Query {
		users: [ User ]
		user( _id: Int! ): User
		quotes: [ Quote ]
		quote( by: Int! ): [ Quote ]
	}

	type Mutation {
		createUser( newUser: newUserInput! ): User
	}

	input newUserInput {
		firstName: String!
		lastName: String
		email: String!
		password: String!
	}

	type User {
		_id: Int!
		firstName: String
		lastName: String
		email: String
		password: String
		quotes: [ Quote ]
	}

	type Quote {
		name: String
		by: Int
	}
`

export default typeDefs;
