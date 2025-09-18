"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Add from "./Add";
import { useState } from "react";

const Header = () => {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <div>
      <header className="flex justify-between items-center p-4 mb-8 bg-white shadow-md fixed w-full top-0 z-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent uppercase">
          Show Products
        </h1>
        <Button onClick={() => setAddProduct(true)}>
          <PlusIcon />
          Add Product
        </Button>
      </header>
      <>{addProduct && <Add setAddProduct={setAddProduct} />}</>
    </div>
  );
};

export default Header;
