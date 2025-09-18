import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<Product>("Product", productSchema);
