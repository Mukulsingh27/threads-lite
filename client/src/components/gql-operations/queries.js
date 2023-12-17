import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
    query getAllQuotes {
        quotes {
            name
            by {
                _id
                firstName
                lastName
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
            quotes {
                name
                createdAt
            }
        }
    }
`;
