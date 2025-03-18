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

interface UpdateUserArgs {
  input: {
    id: string;
    username?: string;
    email?: string;
    location?: string;
    password?: string;
  }
}

interface DeleteUserArgs {
  input: {
    id: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface AddClothingArgs {
  input: {
    image_url: string;
    articleType: string;
    color: string;
    size: string;
    season: string;
  }
}

interface UpdateClothingArgs {
  input: {
    id: string;
    image_url?: string;
    articleType?: string;
    color?: string;
    size?: string;
    season?: string;
  }
}

interface DeleteClothingArgs {
  id: string;
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

interface UpdateOutfitArgs {
  input: {
    id: string
    userId: string;
    topId?: string;
    bottomId?: string;
    dressJumpsuitId?: string;
    shoesId?: string;
    outerwearId?: string;
    accessoriesIds?: string[];
  }
}

interface DeleteOutfitArgs {
  id: string
}

const resolvers = {
  Query: {

    currentUser: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
        // Populate both clothingItems and outfits
          .populate("clothingItems")
          .populate("outfits"); 
          
        // Return the entire user object (which will include populated clothingItems and outfits)
        return user; 
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    // The 'me' query relies on the context to check if the user is authenticated
    // Query to get current user and populate the clothing item and outfit data
    myClothingItems: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate("clothingItems");
        return user ? user.clothingItems : []
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },

    myOutfits: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their thoughts
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate("outfits");
        return user ? user.outfits : []
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },

    // Query to get a specific clothing item for update/delete
    clothingItem: async (_parent: any, { id }: { id: string }) => {
      const item = await ClothingItem.findById(id);
      
      if (!item) {
        throw new Error("Clothing item not found")
      }

      return item
    },

    // Query to get a specific outfit for update/delete
    outfit: async (_parent: any, { id }: { id: string }) => {
      const outfit = await Outfit.findById(id)

      if (!outfit) {
        throw new Error("Outfit not found")
      }

      return outfit
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

    updateUser: async (_parent: any, { input }: UpdateUserArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to update your profile.");
      }
    
      if (context.user._id.toString() !== input.id) {
        throw new AuthenticationError("You can only update your own profile.");
      }
    
      const user = await User.findById(input.id);
      if (!user) {
        throw new Error("User not found.");
      }
    
      // Only update the password if it's provided, triggering the pre-save hook
      if (input.password) {
        user.password = input.password;  // The pre-save hook will hash it automatically
      }
    
      // Update other fields
      Object.assign(user, input);
      
      // Save the updated user
      await user.save();
    
      return user;
    },

    deleteUser: async (_parent: any, { input }: DeleteUserArgs, context: any) => {
      if (!context.user || context.user._id.toString() !== input.id) {
        throw new AuthenticationError("You can only delete your own account.");
      }
    
      const user = await User.findById(input.id);
      if (!user) {
        throw new Error("User not found.");
      }
    
      // Delete associated clothing items and outfits
      await ClothingItem.deleteMany({ _id: { $in: user.clothingItems } });
      await Outfit.deleteMany({ _id: { $in: user.outfits } });
    
      // Delete the user
      await User.findByIdAndDelete(input.id);
    
      return { message: "User successfully deleted." };
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

    addClothingItem: async (_parent: any, { input }: AddClothingArgs, context: any) =>
       {console.log(input)
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a new clothing item")
      }

      // create clothing item
      const clothingItem = await ClothingItem.create({ articleType: input.articleType, color: input.color, size: input.size, season: input.season, image_url: input.image_url });
      console.log(clothingItem)
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
        throw new AuthenticationError("You must be logged in to update a clothing item")
      }

      // Find the clothing item
      const clothingItem = await ClothingItem.findById(input.id);
      if (!clothingItem) {
        throw new Error("Clothing item not found");
      }

      // update the clothing item 
      const updatedClothingItem = await ClothingItem.findByIdAndUpdate(
        input.id,
        { $set: input },
        { new: true, runValidators: true }
      );

      return updatedClothingItem
    },

    deleteClothingItem: async (_parent: any, { id }: DeleteClothingArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete a clothing item")
      }

      // Find the clothing item
      const clothingItem = await ClothingItem.findById(id);
      if (!clothingItem) {
        throw new Error("Clothing item not found");
      }

      // remove the clothing item from the clothingItems array in users
      await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { clothingItems: id } },
        { new: true }
      );

      // delete clothing item from database
      await ClothingItem.findByIdAndDelete(id);
      
      return { message: "Clothing item successfully deleted!" }
    },
    
    addOutfit: async (_parent: any, { input }: AddOutfitArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to add a new outfit")
      }

      // make sure required clothing items exist 
      const requiredItems = await Promise.all([
        ClothingItem.findById(input.topId),
        ClothingItem.findById(input.bottomId),
      ]);

      if (requiredItems.includes(null)) {
        throw new Error("One or more required clothing items do not exist")
      }

      // create new outfit
      const outfit = await Outfit.create({...input });

      // push the clothing item onto the clothingItems array on User
      await User.findByIdAndUpdate(
        context.user._id,
        { $push: { outfits: outfit._id } },
        { new: true }
      );

      return outfit
    },

    updateOutfit: async (_parent: any, { input }: UpdateOutfitArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to update an outfit")
      }

      // Find the clothing item
      const outfit = await Outfit.findById(input.id);
      if (!outfit) {
        throw new Error("Outfit not found");
      }

      // make sure creating user is same as updating user
      if (context.user._id.toString() !== outfit.userId.toString()) {
        throw new AuthenticationError("You can only modify your own outfits.");
      }


      const updatedOutfit = await Outfit.findByIdAndUpdate(
        input.id,
        { $set: input },
        { new: true, runValidators: true }
      );

      return updatedOutfit
    },

    deleteOutfit: async (_parent: any, { id }: DeleteOutfitArgs, context: any) => {
      // make sure user is valid
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete an outfit")
      }
      
      // Find the outfit
      const outfit = await Outfit.findById(id);
      if (!outfit) {
        throw new Error("Outfit not found");
      }
      
      // make sure creating user is same as updating user
      if (context.user._id.toString() !== outfit.userId.toString()) {
        throw new AuthenticationError("You can only modify your own outfits.");
      }

      // remove the outfit from the outfits array in users
      await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { outfits: id } },
        { new: true }
      )

      // delete outfit from database
      await Outfit.findByIdAndDelete(id);
      
      return { message: "Outfit successfully deleted!" }
    },
  },
};

export default resolvers;
