import { gql } from "apollo-server-express";

const typeDefs = gql`
	type Query {
		users: [ User ]
		user( _id: ID! ): User
		quotes: [ QuoteWithUser ]
		quote( by: ID! ): [ Quote ]
		myProfile: User
	}

	type Mutation {
		signUpUser( newUser: newUserInput! ): User
		signInUser( userSignIn: userSignInInput! ): Token
		createQuote( name: String! ): String
		updateQuote( _id: ID!, name: String! ): String
		deleteQuote( _id: ID! ): String
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
		firstName: String!
		lastName: String
		email: String!
		password: String
		profileImage: String!
		quotes: [ Quote ]
	}

	type Quote {
		_id: ID!
		name: String!
		by: ID!
		createdAt: String!
		updatedAt: String!
	}

	type QuoteWithUser {
		_id: ID!
		name: String!
		by: UserDetails!
		createdAt: String!
		updatedAt: String!
	}

	type UserDetails {
		_id: ID!
		firstName: String!
		lastName: String
		profileImage: String!
	}
`;

export default typeDefs;
