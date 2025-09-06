import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {
  name: string;
  price: number;
  description: string;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<Product>("Product", productSchema);
