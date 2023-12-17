import { gql } from "@apollo/client";

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

export const CREATE_QUOTE = gql`
    mutation createQuote($name: String!) {
        createQuote(name: $name)
    }
`;
