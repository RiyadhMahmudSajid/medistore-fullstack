"use client"

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/provider/CartProvider";
import Link from "next/link";

 const CartCounter = () => {
    const { cart } = useCart();


    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link href="/cartData" className="relative group cursor-pointer p-2 rounded-xl bg-secondary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20">
            <ShoppingCart
                size={25}
                strokeWidth={2}
                className="text-foreground transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
            />
            {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-black border-2 border-background shadow-md">
                    {totalItems}
                </span>
            )}
        </Link>
    );
};

export default CartCounter;
