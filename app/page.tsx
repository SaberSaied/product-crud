import { ProductForm } from "./page.client";

const Product = async () => {
  const getData = async () => {
    "use server";
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    return data;
  };

  const DeleteProduct = async (id: string) => {
    "use server";
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
  };

  const GetEditProduct = async (id: string) => {
    "use server";
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await response.json();
    return data;
  };

  const data = await getData();

  return (
    <ProductForm
      data={data}
      DeleteProduct={DeleteProduct}
      GetEditProduct={GetEditProduct}
    />
  );
};

export default Product;
