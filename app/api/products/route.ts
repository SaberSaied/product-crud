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
    body.price = +body.price;
    const newProduct = new Product(body);

    // Check if name is exist
    const checkName = await Product.findOne({ name: body.name });
    if (checkName)
      return NextResponse.json(
        { error: "Name is already exist" },
        { status: 400 }
      );

    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
