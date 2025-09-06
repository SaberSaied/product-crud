import { connectDB } from "@/lib/mongodb";
import Product from "@/app/models/Products";
import { NextResponse } from "next/server";

// GET /api/products/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const product = await Product.findById(id);
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// UPDATE /api/products/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body);
    if (!updatedProduct)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
