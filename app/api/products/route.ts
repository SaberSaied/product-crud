import { connectDB } from "@/lib/mongodb";
import Product from "@/app/models/Products";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    await connectDB();
    const product = await Product.find();
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
