"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/provider/CartProvider";
import { Medicine } from "@/types";
import { ShoppingCart, Zap } from "lucide-react"; 
import { useRouter } from "next/navigation";

interface Props {
  medicine: Medicine;
}

const MedicineDetailsClient = ({ medicine }: Props) => {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const router = useRouter();

  const cartItem = cart.find((item) => item.id === medicine.id);

  
  const handleBuyNow = () => {
    if (!cartItem) {
      addToCart({
        id: medicine.id!,
        name: medicine.name,
        price: medicine.price,
      });
    }
  
    router.push("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
 
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border">
          <Image
            src={medicine.image || "/placeholder.png"}
            alt={medicine.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {medicine.name}
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Manufacturer: <span className="font-semibold text-primary">{medicine.manufacturer}</span>
            </p>
          </div>

          <div className="text-3xl font-bold text-green-600">
            ৳ {medicine.price}
          </div>

          <div className="prose prose-sm text-gray-600 dark:text-gray-300">
            <h3 className="text-sm uppercase font-bold tracking-wider text-muted-foreground">Description</h3>
            <p className="leading-relaxed">
              {medicine.description || "No description available for this product."}
            </p>
          </div>

          <hr className="border-border" />

          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-4">
          
              {cartItem && (
                <div className="flex items-center border-2 border-primary/20 rounded-xl overflow-hidden bg-secondary/30">
                  <button
                    onClick={() => decreaseQty(medicine.id!)}
                    className="px-4 py-2 text-xl font-bold hover:bg-primary/10 transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-lg min-w-[50px] text-center">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(medicine.id!)}
                    className="px-4 py-2 text-xl font-bold hover:bg-primary/10 transition"
                  >
                    +
                  </button>
                </div>
              )}

              <Button
                size="lg"
                variant={cartItem ? "outline" : "default"}
                className={`rounded-xl px-8 py-7 text-lg shadow-sm flex-1 transition-all ${
                  !cartItem && "bg-primary hover:bg-primary/90"
                }`}
                onClick={() =>
                  addToCart({
                    id: medicine.id!,
                    name: medicine.name,
                    price: medicine.price,
                  })
                }
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {cartItem ? "Add More" : "Add to Cart"}
              </Button>
            </div>

            <Button
              onClick={handleBuyNow}
              variant="secondary"
              className="w-full rounded-xl py-7 text-xl font-bold bg-[#ff9f43] hover:bg-[#ee8f32] text-white shadow-md transition-transform active:scale-[0.98]"
            >
              <Zap className="mr-2 h-5 w-5 fill-current" />
              Buy Now 
            </Button>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsClient;