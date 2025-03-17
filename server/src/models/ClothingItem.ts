import { Schema, model, Document, Types } from "mongoose";

interface IClothingItem extends Document {
    _id: Types.ObjectId;
    image_url: string;
    articleType: "Top" | "Bottom" | "Dress_Jumpsuit" | "Shoes" | "Outerwear" | "Accessories";
    color: "Red" | "Green" | "Blue" | "Yellow" | "Orange" | "Pink" | "Black" | "White" | "Grey" | "Multi_Color";
    size: "OS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
    season: "Spring" | "Summer" | "Fall" | "Winter";
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
            enum: ["Top", "Bottom", "Dress_Jumpsuit", "Shoes", "Outerwear", "Accessories"]
        },
        color: {
            type: String,
            required: true,
            enum: ["Red", "Green", "Blue", "Yellow", "Orange", "Pink", "Black", "White", "Grey", "Multi_Color"]
        },
        size: {
            type: String,
            required: true,
            enum: ["OS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
        },
        season: {
            type: String,
            required: true,
            enum: ["Spring", "Summer", "Fall", "Winter"]
        },
    },
    { timestamps: true },
);

const ClothingItem = model<IClothingItem>("ClothingItem", clothingItemSchema);

export default ClothingItem