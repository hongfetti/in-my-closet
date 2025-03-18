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
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
    user {
      _id
      username
      email
      password
      location
    }
    token
  }
}
`;

export const ADD_CLOTHING_ITEM = gql`
  mutation addClothingItem($clothingInput: ClothingItemInput!) {
  
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

export const ADD_OUTFIT = gql`
  mutation addOutfit($input: OutfitInput!) {
  addOutfit(input: $input) {
    _id
    user {
      _id
    }
    top {
      _id
    }
    bottom {
      _id
    }
    dressJumpsuit {
      _id
    }
    shoes {
      _id
    }
    outerwear {
      _id
    }
    accessories {
      _id
    }
  }
}
`;