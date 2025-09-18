"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, ShoppingBasketIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Edit from "./components/Edit";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const ProductForm = ({
  data,
  DeleteProduct,
  GetEditProduct,
}: {
  data: Product[];
  DeleteProduct: (id: string) => void;
  GetEditProduct: (id: string) => Promise<Product>;
}) => {
  const [editProduct, setEditProduct] = useState(false);
  const [ProductId, setProductId] = useState<string>("");
  const [dataEdit, setDataEdit] = useState<Product>({} as Product);

  const router = useRouter();
  const handleDelete = (id: string) => {
    DeleteProduct(id);
    router.refresh();
  };

  const handleEdit = async (id: string) => {
    setProductId(id);
    setDataEdit(await GetEditProduct(id));
    setEditProduct(true);
  };

  return (
    <div className="p-4 mt-20">
      <div className="flex items-center justify-around gap-4 flex-wrap animate-in fade-in duration-3000">
        {data.map((product) => (
          <Card
            key={product._id}
            className="min-w-sm mx-auto rounded-lg border border-gray-200 shadow-md relative hover:scale-105 transition-transform duration-500"
          >
            <CardAction className="flex w-full justify-between absolute top-2">
              <Button
                onClick={() => handleDelete(product._id)}
                className="text-red-500 hover:bg-red-700 w-[30px] h-[30px] rounded-full ml-2"
                variant="outline"
              >
                <TrashIcon />
              </Button>
              <Button
                className="text-green-500 hover:bg-green-700 w-[30px] h-[30px] rounded-full mr-2"
                variant="outline"
                onClick={() => handleEdit(product._id)}
              >
                <EditIcon />
              </Button>
            </CardAction>
            <CardHeader className="flex justify-between items-center mt-6 px-4">
              <div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </div>
              <CardAction>
                <Button variant="outline">
                  <ShoppingBasketIcon /> Add to Cart
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {/* <Image src={product.imageUrl} alt={product.name} /> */}
              <p className="mt-2 text-lg font-semibold">${product.price}</p>
              <CardAction className="flex w-full mt-4 justify-between">
                <Button>Buy Now</Button>
                <Button variant="link">Learn More</Button>
              </CardAction>
            </CardContent>
          </Card>
        ))}
        {editProduct && (
          <Edit
            setEditProduct={setEditProduct}
            productId={ProductId}
            dataEdit={dataEdit}
          />
        )}
      </div>
    </div>
  );
};
