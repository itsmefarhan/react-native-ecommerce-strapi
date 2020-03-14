import { gql } from "apollo-boost";

export const CATEGORIES_QUERY = gql`
  query {
    categories {
      _id
      name
      image {
        name
        url
      }
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query($id: ID!) {
    category(id: $id) {
      name
      products {
        _id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;
