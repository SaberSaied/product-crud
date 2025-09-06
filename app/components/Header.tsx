import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent uppercase">
        Show Products
      </h1>
      <Link href="/add">
        <Button>
          <PlusIcon />
          Add Product
        </Button>
      </Link>
    </header>
  );
};

export default Header;
