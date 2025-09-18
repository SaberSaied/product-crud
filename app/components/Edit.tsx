import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import {
  Form,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Product } from "../page.client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.number().min(1, "Price is required"),
});

const Edit = ({
  setEditProduct,
  productId,
  dataEdit,
}: {
  setEditProduct: (value: boolean) => void;
  productId: string;
  dataEdit: Product;
}) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dataEdit.name,
      description: dataEdit.description,
      price: dataEdit.price,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/");
    setEditProduct(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
      <Card className="absolute min-w-[400px]">
        <CardHeader>
          <CardAction className="absolute top-4 right-4">
            <Button variant="ghost" onClick={() => setEditProduct(false)}>
              <XIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product price"
                        type="number"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Edit Product</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Edit;
