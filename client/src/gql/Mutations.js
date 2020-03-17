import { gql } from "apollo-boost";

export const REGISTER_USER = gql`
  mutation($input: UserInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation($input: createOrderInput!) {
    createOrder(input: $input) {
      order {
        address
        postalCode
        city
        products
        amount
      }
    }
  }
`;
