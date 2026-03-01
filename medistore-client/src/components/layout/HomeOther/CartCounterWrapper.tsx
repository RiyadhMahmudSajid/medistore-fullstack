"use client";

import dynamic from "next/dynamic";

const CartCounter = dynamic(() => import("./CartCounter"), {
  ssr: false,
});

export default function CartCounterWrapper() {
  return <CartCounter />;
}
