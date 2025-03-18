import gql from 'graphql-tag';

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
    user: User!
    top: ClothingItem!
    bottom: ClothingItem!
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

  input OutfitInput {
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
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    currentUser: User
    myClothingItems: [ClothingItem]
    myOutfits: [Outfit]
    outfits: [Outfit]
    outfit(id: ID!): Outfit
    clothingItems: [ClothingItem]
    clothingItem(id: ID!): ClothingItem
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth

    addClothingItem(input: ClothingItemInput!): ClothingItem
    updateClothingItem(input: UpdateClothingItemInput!): ClothingItem
    deleteClothingItem(id: ID!): ClothingItem

    addOutfit(input: OutfitInput!): Outfit
    updateOutfit(input: UpdateOutfitInput!): Outfit
    deleteOutfit(id: ID!): Outfit
  }
`;

export default typeDefs;
