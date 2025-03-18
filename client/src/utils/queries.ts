import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      _id
      username
      email
      password
      location
      clothingItems {
        _id
      }
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
  query getClothingItemById ($clothingItemId: ID!) {
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
      dressJumpsuit {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      shoes {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      outerwear {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      accessories {
        _id
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
      dressJumpsuit {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      shoes {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      outerwear {
        _id
        image_url
        articleType
        color
        size
        season
        createdAt
      }
      accessories {
        _id
      }
    }
  }
`;
