import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    outfits: [Outfit]!
    clothingItem: [ClothingItem]!
    location: String!
  }

  type ClothingItem {
    _id: ID!
    imageUrl: String!
    clothingType: ClothingType!
    color: String!
    size: String!
    season: Season!
    createdAt: String!
  }

  enum ClothingType {
    TOP
    BOTTOM
    OUTERWEAR
  }

  enum Season {
    SPRING
    SUMMER
    FALL
    WINTER
  }

  type Outfit {
    _id: ID!
    user: User!
    top: ClothingItem!
    bottom: ClothingItem!
    outerwear: ClothingItem
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    location: String!
  }

  input ClothingItemInput {
    imageUrl: String!
    clothingType: ClothingType!
    color: String!
    size: String!
    season: Season!
  }

  input OutfitInput {
    topId: ID!
    bottomId: ID!
    outerwearId: ID!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    outfits: [Outfit]
    outfit(id: ID!): Outfit
    clothingItems: [ClothingItem]
    clothingItem(id: ID!): ClothingItem
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addClothingItem(input: ClothingItemInput!): ClothingItem
    addOutfit(input: OutfitInput!): Outfit
  }
`;

export default typeDefs;
