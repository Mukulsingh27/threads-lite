import { gql } from 'apollo-server';

const typeDefs = gql`
	type Query {
		users: [ User ]
		user( id: Int! ): User
		quotes: [ Quote ]
		quote( by: Int! ): [ Quote ]
	}

	type Mutation {
		createUser( firstName: String!, lastName: String, email: String!, password: String!) : User
	}

	type User {
		id: Int!
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
