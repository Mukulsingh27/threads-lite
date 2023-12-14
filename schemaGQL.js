import { gql } from "apollo-server";

const typeDefs = gql`
	type Query {
		users: [ User ]
		user( _id: ID! ): User
		quotes: [ QuoteWithUser ]
		quote( by: ID! ): [ Quote ]
	}

	type Mutation {
		signUpUser( newUser: newUserInput! ): User
		signInUser( userSignIn: userSignInInput! ): Token
		createQuote( name: String! ): String
	}

	type Token {
		token: String!
	}

	input newUserInput {
		firstName: String!
		lastName: String
		email: String!
		password: String!
	}

	input userSignInInput {
		email: String!
		password: String!
	}

	type User {
		_id: ID!
		firstName: String
		lastName: String
		email: String!
		password: String
		quotes: [ Quote ]
	}

	type Quote {
		name: String!
		by: ID!
	}

	type QuoteWithUser {
		name: String!
		by: UserDetails!
	}

	type UserDetails {
		_id: ID!
		firstName: String!
		lastName: String
	}
`;

export default typeDefs;
