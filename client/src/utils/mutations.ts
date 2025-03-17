import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const ADD_USER_AND_CLOTHING_ITEM = gql`
  mutation AddUser($input: UserInput!, $clothingInput: ClothingItemInput!) {
  addUser(input: $input) { 
    token
    user {
      id
      email
      username
    }
  }
  addClothingItem(input: $clothingInput) {   
    id
    image_url
    articleType
    color
    size
    season
  }
}
`;

