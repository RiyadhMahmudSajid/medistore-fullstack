"use client";

import { useCart } from "@/provider/CartProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const MyCart = () => {
  const { cart, removeFromCart } = useCart();
  const router = useRouter()

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );



  if (cart.length === 0) {
    return (
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle>Your Cart is Empty</CardTitle>
          <CardDescription>
            Add some products to see them here.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {cart.map((item) => (
        <Card key={item.id} className="p-4">
          <CardHeader className="p-0 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {item.name}
              </CardTitle>
              <Badge variant="secondary">
                Qty: {item.quantity}
              </Badge>
            </div>
            <CardDescription>
              Price: ${item.price}
            </CardDescription>
          </CardHeader>

          <CardFooter className="p-0 pt-3 flex justify-between items-center">
            <span className="font-semibold">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </span>
            <Button
              onClick={() => removeFromCart(item.id)}
              size="sm" variant="destructive">
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Grand Total:</span>
          <span className="text-lg font-bold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <Button onClick={() => router.push("/checkout")}className="w-full">
          Proceed to Checkout
        </Button>
      </Card>
    </div>
  );
};

export default MyCart;
