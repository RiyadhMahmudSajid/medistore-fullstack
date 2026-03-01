"use client";

import { useCart } from "@/provider/CartProvider";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { env } from "@/env";
import { createOrderAction } from "@/action/createOrderAction";

type Props = {
    user: string
}

const API_URL = env.NEXT_PUBLIC_API_URL

const CheckoutPage = ({ user }: Props) => {
    const { cart, removeFromCart } = useCart();
    const totalPrice = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    const form = useForm({
        defaultValues: {
            fullName: "",
            phone: "",
            city: "",
            area: "",
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Processing...");
            try {
                const res = await createOrderAction({
                    ...value,
                    customerId: user,
                    totalPrice,
                    items: cart.map((item: any) => ({
                        medicineId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                });

                if (res.error) {
                    throw new Error(res.error.message);
                }

                if (res.data?.paymentUrl) {
                    window.location.href = res.data.paymentUrl;

                    cart.forEach((item) => {
                        removeFromCart(item.id);
                    });
                }

                toast.success("Order created!", { id: toastId });
            } catch (error: any) {
                toast.error(error.message || "Error occurred", { id: toastId });
            }
        },
    });

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="space-y-8">
                {/* Order Summary Simple List */}
                <div className="border-b pb-4">
                    <h2 className="font-semibold mb-3">Order Summary</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm mb-1">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>৳{item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold mt-4 pt-4 border-t">
                        <span>Total Amount</span>
                        <span>৳{totalPrice}</span>
                    </div>
                </div>

                {/* Simple Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <h2 className="font-semibold">Shipping Details</h2>

                    <form.Field name="fullName">
                        {(field) => (
                            <Input
                                placeholder="Full Name"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        )}
                    </form.Field>

                    <form.Field name="phone">
                        {(field) => (
                            <Input
                                placeholder="Phone Number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        )}
                    </form.Field>

                    <div className="grid grid-cols-2 gap-4">
                        <form.Field name="city">
                            {(field) => <Input placeholder="City" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />}
                        </form.Field>
                        <form.Field name="area">
                            {(field) => <Input placeholder="Area" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />}
                        </form.Field>
                    </div>

                    <Button type="submit" variant="outline" className="w-full">
                        Pay Now ৳{totalPrice}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;