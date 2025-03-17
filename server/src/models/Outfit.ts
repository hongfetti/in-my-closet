import { Schema, model, Document, Types } from "mongoose";
import ClothingItem from "./ClothingItem.js";

interface IOutfit extends Document {
    _id: Types.ObjectId;
    userId: Schema.Types.ObjectId;
    topId: Schema.Types.ObjectId;
    bottomId: Schema.Types.ObjectId;
    outerwearId?: Schema.Types.ObjectId;
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

            // this should ensure that items that are tops are saved as such
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "Top";
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
                    return item?.articleType === "Bottom";
                },
                message: "bottomId must refer to an item of the type 'Bottom'"
            }
        },
        outerwearId: {
            type: Schema.Types.ObjectId,
            ref: "ClothingItems",
            required: false,
            validate: {
                validator: async function (value: Types.ObjectId) {
                    const item = await ClothingItem.findById(value);
                    return item?.articleType === "Outerwear";
                },
                message: "outerwearId must refer to an item of the type 'Outerwear'"
            }
        },
    }
);

const Outfit = model<IOutfit>("Outfit", outfitSchema)

export default Outfit