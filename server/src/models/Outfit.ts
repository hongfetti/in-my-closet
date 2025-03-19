import { Schema, model, Document, Types } from "mongoose";
import ClothingItem from "./ClothingItem.js";

interface IOutfit extends Document {
    _id: Types.ObjectId;
    userId: Schema.Types.ObjectId;
    topId: Schema.Types.ObjectId;
    bottomId: Schema.Types.ObjectId;
    dressJumpsuitId?: Schema.Types.ObjectId;
    shoesId?: Schema.Types.ObjectId;
    outerwearId?: Schema.Types.ObjectId;
    accessoriesId?: Schema.Types.ObjectId;
}

const outfitSchema = new Schema<IOutfit>(
    {
        userId: {
           type: Schema.Types.ObjectId,
           ref: "User",
           required: true,
        },
        topId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: true,

            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "TOP";
                },
                message: "topId must refer to an item of the type 'Top'"
            }
        },
        bottomId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: true,
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "BOTTOM";
                },
                message: "bottomId must refer to an item of the type 'Bottom'"
            }
        },
        dressJumpsuitId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: true,
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "DRESS_JUMPSUIT";
                },
                message: "dressJumpsuitId must refer to an item of the type 'Dress/Jumpsuit'"
            }
        },
        shoesId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: true,
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "SHOES";
                },
                message: "shoesId must refer to an item of the type 'Shoes'"
            }
        },
        outerwearId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: false,
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "OUTERWEAR";
                },
                message: "outerwearId must refer to an item of the type 'Outerwear'"
            }
        },
        accessoriesId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: true,
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "ACCESSORIES";
                },
                message: "accessoriesId must refer to an item of the type 'Accessories'"
            }
        },
    }
);

const Outfit = model<IOutfit>("Outfit", outfitSchema)

export default Outfit