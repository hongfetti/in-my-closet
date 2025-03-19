import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      _id
      username
      email
      password
      clothingItems {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      location
      outfits {
        _id
      }
    }
  }
`;

export const GET_CLOTHING_ITEMS = gql`
  query GetClothingItems {
    clothingItems {
      _id
      image_url
      articleType
      color
      size
      season
      createdAt
    }
  }
`;

export const GET_CLOTHING_ITEM_BY_ID = gql`
  query getClothingItemById($clothingItemId: ID!) {
    clothingItem(id: $clothingItemId) {
      _id
      image_url
      articleType
      color
      size
      season
      createdAt
    }
  }
`;

export const GET_OUTFITS = gql`
  query getOutfits {
    outfits {
      _id
      userId
      top {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      bottom {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      # dressJumpsuit {
      #   _id
      #   image_url
      #   articleType
      #   color
      #   size
      #   season
      #   createdAt
      # }
      # shoes {
      #   _id
      #   image_url
      #   articleType
      #   color
      #   size
      #   season
      #   createdAt
      # }
      # outerwear {
      #   _id
      #   image_url
      #   articleType
      #   color
      #   size
      #   season
      #   createdAt
      # }
      # accessories {
      #   _id
      # }
    }
  }
`;

export const GET_ALL_MY_OUTFITS = gql`
query MyOutfits {
  myOutfits {
    _id
    top {
      _id
      image_url
    }
    bottom {
      _id
      image_url
    }
  }
}
`;
export const GET_OUTFIT_BY_ID = gql`
  query getOutfitById($outfitId: ID!) {
    outfit(id: $outfitId) {
      _id
      top {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      bottom {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      # dressJumpsuit {
      #   _id
      #   image_url
      #   articleType
      #   color
      #   size
      #   season
      #   createdAt
      # }
      # shoes {
      #   _id
      #   image_url
      #   articleType
      #   color
      #   size
      #   season
      #   createdAt
      # }
      # outerwear {
      #   _id
      #   image_url
      #   articleType
      #   color
      #   size
      #   season
      #   createdAt
      # }
      # accessories {
      #   _id
      # }
    }
  }
`;
