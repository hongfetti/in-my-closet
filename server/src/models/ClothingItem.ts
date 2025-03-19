import { Schema, model, Document, Types } from "mongoose";

interface IClothingItem extends Document {
  _id: Types.ObjectId;
  image_url: string;
  articleType:
    | "TOP"
    | "BOTTOM"
    | "DRESS_JUMPSUIT"
    | "SHOES"
    | "OUTERWEAR"
    | "ACCESSORIES";
  color:
    | "RED"
    | "GREEN"
    | "BLUE"
    | "YELLOW"
    | "ORANGE"
    | "PINK"
    | "BLACK"
    | "WHITE"
    | "GREY"
    | "MULTI_COLOR";
  size: "OS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  season: "SPRING" | "SUMMER" | "FALL" | "WINTER";
  createdAt: Date;
}

const clothingItemSchema = new Schema<IClothingItem>(
  {
    image_url: {
      type: String,
      required: true,
      trim: true,
    },
    articleType: {
      type: String,
      required: true,
      enum: [
        "TOP",
        "BOTTOM",
        "DRESS_JUMPSUIT",
        "SHOES",
        "OUTERWEAR",
        "ACCESSORIES",
      ],
    },
    color: {
      type: String,
      required: true,
      enum: [
        "RED",
        "GREEN",
        "BLUE",
        "YELLOW",
        "ORANGE",
        "PINK",
        "BLACK",
        "WHITE",
        "GREY",
        "MULTI_COLOR",
      ],
    },
    size: {
      type: String,
      required: true,
      enum: ["OS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
    season: {
      type: String,
      required: true,
      enum: ["SPRING", "SUMMER", "FALL", "WINTER"],
    },
  },
  { timestamps: true }
);

const ClothingItem = model<IClothingItem>("ClothingItems", clothingItemSchema);

export default ClothingItem;
