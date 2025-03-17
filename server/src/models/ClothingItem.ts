import { Schema, model, Document, Types } from 'mongoose';

interface IClothingItem extends Document {
    _id: Types.ObjectId;
    imageUrl: string;
    articleType: 'top' | 'bottom' | 'outerwear';
    color: string;
    size: string;
    season: string;
    createdAt: Date;
}

const clothingItemSchema = new Schema<IClothingItem>(
    {
        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },
        articleType: {
            type: String,
            required: true,
            enum: ['top', 'bottom', 'outerwear']
        },
        color: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: String,
            required: true,
            trim: true,
        },
        season: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true },
);

const ClothingItem = model<IClothingItem>('ClothingItem', clothingItemSchema);

export default ClothingItem