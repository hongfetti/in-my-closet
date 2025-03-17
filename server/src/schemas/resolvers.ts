import { User, ClothingItem, Outfit } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
    location: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

// is being used to get other users - not used currently
// interface UserArgs {
//   username: string;
// }

interface AddClothingArgs {
  input: {
    image_url: string;
    articleType: string;
    color: string;
    size: string;
    season: string;
    createdAt: Date;
  }
}

interface UpdateClothingArgs {
  input: {
    id: string;
    image_url?: string;
    articleType?: string;
    color?: string;
    size?: string;
    season: string;
    createdAt: Date;
  }
}

interface AddOutfitArgs {
  input: {
    userId: string;
    topId: string;
    bottomId: string;
    dressJumpsuitId?: string;
    shoesId?: string;
    outerwearId?: string;
    accessoriesIds?: string[];
  }
}

const resolvers = {
  Query: {
    // The 'me' query relies on the context to check if the user is authenticated
    // Query to get current user and populate the clothing item and outfit data
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("clothingItems").populate("outfits");
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },

    // Query to get a specific clothing item for update/delete
    clothingItem: async (_parent: any, { id }: { id: string }) => {
      return ClothingItem.findById(id);
    },

    // Query to get a specific outfit for update/delete
    outfit: async (_parent: any, { id }: { id: string }) => {
      return Outfit.findById(id)
    }
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Check to see if user being created already exists
      const existingUser = await User.findOne({
        $or: [{ username: input.username }, { email: input.email }],
      });

      if (existingUser) {
        throw new AuthenticationError("Username or email already exists")
      };

      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },

    addClothingItem: async (_parent: any, { input }: AddClothingArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a new clothing item")
      }

      // create clothing item
      const clothingItem = await ClothingItem.create({...input });

      // push the clothing item onto the clothingItems array on User
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { clothingItems: clothingItem._id } },
        { new: true }
      );

      return clothingItem

    },

    updateClothingItem: async (_parent: any, { input }: UpdateClothingArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a new clothing item")
      }

      // Find the clothing item
      const clothingItem = await ClothingItem.findById(input.id);
      if (!clothingItem) {
        throw new Error("Clothing item not found");
      }

      const updatedClothingItem = await ClothingItem.findByIdAndUpdate(
        input.id,
        { $set: input },
        { new: true, runValidators: true }
      );

      return updatedClothingItem
    },

    deleteClothingItem: async (_parent: any, { input }: UpdateClothingArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a new clothing item")
      }

      // Find the clothing item
      const clothingItem = await ClothingItem.findById(input.id);
      if (!clothingItem) {
        throw new Error("Clothing item not found");
      }

      // remove the clothing item from the clothingItems array in users
      await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { clothingItems: input.id } },
        { new: true }
      );

      // delete clothing item from database
      await ClothingItem.findByIdAndDelete(input.id);
      
      return { message: "Clothing item successfully deleted!" }
    },
    
    addOutfit: async (_parent: any, { input }: AddOutfitArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a new clothing item")
      }

      // create clothing item
      const outfit = await Outfit.create({...input });

      // push the clothing item onto the clothingItems array on User
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { outfits: outfit._id } },
        { new: true }
      );

      return outfit
    }
  },
};

export default resolvers;
