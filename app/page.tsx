import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Product = () => {
  const getData = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    return data;
  };

  return (
    <div className="p-4">
      {getData().then((products: Product[]) => (
        <div className="flex items-center justify-around gap-4 flex-wrap animate-in fade-in duration-3000">
          {products.map((product) => (
            <Card
              key={product._id}
              className="min-w-sm mx-auto rounded-lg border border-gray-200 shadow-md relative"
            >
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardAction className="absolute top-4 right-4">
                <Button variant="outline">Add to Cart</Button>
              </CardAction>
              <CardContent>
                <Image src={product.imageUrl} alt={product.name} />
                <p className="mt-2 text-lg font-semibold">${product.price}</p>
                <CardAction className="flex w-full mt-4 justify-between">
                  <Button>Buy Now</Button>
                  <Button variant="link">Learn More</Button>
                </CardAction>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Product;
