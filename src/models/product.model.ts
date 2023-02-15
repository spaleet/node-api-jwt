import mongoose from "mongoose";
import { IUserDocument } from '@models';
import { customAlphabet } from 'nanoid';

// generate custom ids
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface IProductDocument extends mongoose.Document {
    user: IUserDocument['_id']
    title: string
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});

const ProductModel = mongoose.model<IProductDocument>("Product", productSchema);

export default ProductModel;