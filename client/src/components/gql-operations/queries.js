import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
	query getAllQuotes($page: Int!, $pageSize: Int!) {
		quotes(page: $page, pageSize: $pageSize) {
			_id
			name
			by {
				_id
				firstName
				lastName
				profileImage
			}
			createdAt
		}
	}
`;

export const GET_QUOTE_BY_ID = gql`
	query getQuote($id: ID!) {
		quote(_id: $id) {
			_id
			name
			by {
				_id
				firstName
				lastName
				profileImage
			}
			createdAt
		}
	}
`;

export const GET_MY_PROFILE = gql`
	query getMyProfile {
		user: myProfile {
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

export const GET_USER_PROFILE = gql`
	query getUserById($id: ID!) {
		user(_id: $id) {
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
			}
		}
	}
`;

export const GET_USER_BY_QUERY = gql`
	query fetchUsers($query: String!) {
		fetchUsers(query: $query) {
			_id
			firstName
			lastName
			email
		}
	}
`;
