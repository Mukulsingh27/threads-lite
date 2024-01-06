import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Query {
		users: [User]
		user(_id: ID!): User
		quotes(page: Int!, pageSize: Int!): [QuoteWithUser]
		quote(_id: ID!): Quote
		myProfile: User
		fetchUsers(query: String!): [User]
	}

	type Mutation {
		signUpUser(newUser: newUserInput!): User
		signInUser(userSignIn: userSignInInput!): Token
		updateUser(
			firstName: String!
			lastName: String
			profileImage: String!
		): User
		deleteUserWithQuotes(_id: ID!): String
		verifyUser(token: String!): String
		resetPassword(email: String!): String
		setNewPassword(token: String!, password: String!): String
		createQuote(name: String!): String
		updateQuote(_id: ID!, name: String!): String
		deleteQuote(_id: ID!): String
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
		verified: Boolean!
		quotes: [Quote]
	}

	type Quote {
		_id: ID!
		name: String!
		by: UserDetails!
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
