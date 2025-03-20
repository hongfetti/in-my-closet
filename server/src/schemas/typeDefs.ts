import gql from "graphql-tag";
// import { Outfit } from "../models";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    outfits: [Outfit]
    clothingItems: [ClothingItem]
    location: String!
  }

  type ClothingItem {
    _id: ID!
    image_url: String!
    articleType: ArticleType!
    color: Color!
    size: Size!
    season: Season!
    createdAt: String!
  }

  enum ArticleType {
    TOP
    BOTTOM
    DRESS_JUMPSUIT
    SHOES
    OUTERWEAR
    ACCESSORIES
  }

  enum Color {
    RED
    GREEN
    BLUE
    YELLOW
    ORANGE
    PINK
    BLACK
    WHITE
    GREY
    MULTI_COLOR
  }

  enum Size {
    OS
    XS
    S
    M
    L
    XL
    XXL
    XXXL
  }

  enum Season {
    SPRING
    SUMMER
    FALL
    WINTER
  }

  type Outfit {
    _id: ID!
    user: ID!
    topId: ClothingItem
    bottomId: ClothingItem
     dressJumpsuit: ClothingItem
     shoes: ClothingItem
     outerwear: ClothingItem
     accessories: [ClothingItem]
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    location: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    location: String
    password: String
  }

  input DeleteUserInput {
    id: ID!
  }

  input ClothingItemInput {
    image_url: String!
    articleType: ArticleType!
    color: Color!
    size: Size!
    season: Season!
  }

  input UpdateClothingItemInput {
    id: ID!
    image_url: String
    articleType: ArticleType
    color: Color
    size: Size
    season: Season
  }

  input DeleteClothingItemInput {
    id: ID!
  }

  input OutfitInput {
    # userId: ID!
    topId: ID!
    bottomId: ID!
     dressJumpsuitId: ID
     shoesId: ID
     outerwearId: ID
     accessoriesIds: [ID!]
  }

  input UpdateOutfitInput {
    id: ID!
    topId: ID
    bottomId: ID
     dressJumpsuitId: ID
     shoesId: ID
     outerwearId: ID
     accessoriesIds: [ID!]
  }

  input DeleteOutfitInput {
    id: ID!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    currentUser: User # This may need to just return one user and not a user array
    myClothingItems: [ClothingItem]
    myOutfits: [Outfit]
    outfits: [Outfit]
    outfit(id: ID!): Outfit
    clothingItems: [ClothingItem]
    clothingItem(id: ID!): ClothingItem
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    updateUser(input: UpdateUserInput!): User
    deleteUser(input: DeleteUserInput!): User

    addClothingItem(input: ClothingItemInput!): ClothingItem
    updateClothingItem(input: UpdateClothingItemInput!): ClothingItem
    deleteClothingItem(input: DeleteClothingItemInput!): ClothingItem

    addOutfit(input: OutfitInput!): Outfit
    updateOutfit(input: UpdateOutfitInput!): Outfit
    deleteOutfit(input: DeleteOutfitInput!): Outfit
  }
`;
;
export default typeDefs; 
