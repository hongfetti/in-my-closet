import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

// Define an interface for the User document
interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  outfits: Schema.Types.ObjectId[];
  clothingItems: Schema.Types.ObjectId[];
  location: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    outfits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Outfit",
      },
    ],
    clothingItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClothingItems",
      },
    ],
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
