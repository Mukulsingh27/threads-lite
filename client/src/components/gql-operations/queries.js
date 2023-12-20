import { gql } from '@apollo/client';

export const GET_ALL_QUOTES = gql`
	query getAllQuotes {
		quotes {
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
			firstName
			lastName
			email
			profileImage
			quotes {
				_id
				name
				createdAt
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
			quotes {
				name
				createdAt
			}
		}
	}
`;
