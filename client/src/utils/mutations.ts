import { gql } from "@apollo/client";

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

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
    _id
    username
    email
    location
  }
}
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      _id
      username
      email
    }
  }
`;

export const ADD_CLOTHING_ITEM = gql`
  mutation addClothingItem($input: ClothingItemInput!) {
    addClothingItem(input: $input) {   
      _id
      image_url
      articleType
      color
      size
      season
    }
  }
`;

export const UPDATE_CLOTHING_ITEM = gql`
  mutation updateClothingItem($input: UpdateClothingItemInput!) {
    updateClothingItem(input: $input) {
      _id
      image_url
      articleType
      color
      size
      season
    }
  }
`;

export const DELETE_CLOTHING_ITEM = gql`
  mutation deleteClothingItem($input: DeleteClothingItemInput!) {
    deleteClothingItem(input: $input) {
      _id
    }
  }
`;

export const ADD_OUTFIT = gql`
  mutation addOutfit($input: OutfitInput!) {
    addOutfit(input: $input) {
      _id
      # user {
      #   _id
      }
      top {
        _id
      }
      bottom {
        _id
      }
      # dressJumpsuit {
      #   _id
      # }
      # shoes {
      #   _id
      # }
      # outerwear {
      #   _id
      # }
      # accessories {
      #   _id
      # }
    }
  # }
`;

export const UPDATE_OUTFIT = gql`
  mutation updateOutfit($input: UpdateOutfitInput!) {
    updateOutfit(input: $input) {
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

export const DELETE_OUTFIT = gql`
  mutation deleteOutfit($input: DeleteOutfitInput!) {
    deleteOutfit(input: $input) { 
      _id
    }
  }
`;
