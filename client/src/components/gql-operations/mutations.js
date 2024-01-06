import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
	mutation createNewUSer($newUser: newUserInput!) {
		user: signUpUser(newUser: $newUser) {
			firstName
			lastName
		}
	}
`;

export const SIGN_IN_USER = gql`
	mutation getUser($userSignIn: userSignInInput!) {
		user: signInUser(userSignIn: $userSignIn) {
			token
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUSer($firstName: String, $lastName: String, $bio: String) {
		user: updateUser(
			firstName: $firstName
			lastName: $lastName
			bio: $bio
		) {
			_id
			firstName
			lastName
			email
			profileImage
			bio
			quotes {
				_id
				name
				createdAt
				updatedAt
			}
		}
	}
`;

export const DELETE_USER = gql`
	mutation deleteUser($id: ID!) {
		deleteUserWithQuotes(_id: $id)
	}
`;

export const VERIFY_USER = gql`
	mutation verifyUser($token: String!) {
		verifyUser(token: $token)
	}
`;

export const RESET_PASSWORD = gql`
	mutation resetPassword($email: String!) {
		resetPassword(email: $email)
	}
`;

export const SET_NEW_PASSWORD = gql`
	mutation setNewPassword($token: String!, $password: String!) {
		setNewPassword(token: $token, password: $password)
	}
`;

export const CREATE_QUOTE = gql`
	mutation createQuote($name: String!) {
		createQuote(name: $name)
	}
`;

export const UPDATE_QUOTE = gql`
	mutation updateQuote($id: ID!, $name: String!) {
		updateQuote(_id: $id, name: $name)
	}
`;

export const DELETE_QUOTE = gql`
	mutation deleteQuote($id: ID!) {
		deleteQuote(_id: $id)
	}
`;
