"use client"
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    image?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;

    addToCart: (product: Omit<CartItem, "quantity">) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    removeFromCart: (id: string) => void;
    removeAllFromCart: (selectedItem: CartItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (product: Omit<CartItem, "quantity">) => {
       
        setCart(prev => {
            const exist = prev.find(p => p.id === product.id);

            if (exist) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const increaseQty = (id: string) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id: string) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const removeAllFromCart = (selectedItem: CartItem) => {
        setCart(prev => prev.filter(item => item.id !== selectedItem.id));
    };

    

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, increaseQty, decreaseQty, removeFromCart, removeAllFromCart }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }

     return context;
}

export default CartProvider;