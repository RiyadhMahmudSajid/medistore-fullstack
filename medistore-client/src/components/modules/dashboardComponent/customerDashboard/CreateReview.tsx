
"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@tanstack/react-form"

import * as z from "zod"
import { toast } from "sonner"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { createReview } from "@/action/reviewAction"
import { Order } from "@/types"






const formSchema = z.object({
    comment: z.string().min(10, "Comment must be at least 10 characters."),
    rating: z.number().min(1).max(5),
    customerId: z.string(),
    medicineId: z.string().min(1, "Please select a medicine"),
})

export function CreateReview({ customerId, order }: { customerId: string, order: Order[] }) {

    const form = useForm({
        defaultValues: {
            comment: "",
            rating: 0,
            customerId: customerId,
            medicineId: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Submitting review...")
            try {

                const res = await createReview(value, value.medicineId)
                toast.success("Review submitted successfully", { id: toastId })
                form.reset()
            } catch (error) {
                toast.error("Something went wrong", { id: toastId })
            }
        },
    })

    return (
        <Card className="max-w-4xl mx-auto border-none shadow-xl bg-card/50 backdrop-blur-sm">

            <CardContent className="pt-8">
                <form id="review-form" className="space-y-6" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">

                            <form.Field name="medicineId">
                                {(field) => (
                                    <div className="space-y-2">
                                        <FieldLabel className="font-semibold">Select Purchased Medicine</FieldLabel>
                                        <select
                                            className="w-full p-2 border rounded-md bg-background text-sm h-10"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        >
                                            <option value="">Choose a medicine</option>

                                            {order
                                                ?.filter((singleOrder) => singleOrder.status === "DELIVERED") 
                                                .map((deliveredOrder) =>
                                                    deliveredOrder.order.map((item) => (
                                                        <option key={item.medicineId} value={item.medicineId}>
                                                            {item.medicine.name} (Delivered on: {new Date(deliveredOrder.updateAt).toLocaleDateString()})
                                                        </option>
                                                    ))
                                                )}
                                        </select>
                                    </div>
                                )}
                            </form.Field>


                            <form.Field name="rating">
                                {(field) => (
                                    <div className="space-y-2">
                                        <FieldLabel className="font-semibold">Rating (1-5)</FieldLabel>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={5}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>


                        <form.Field name="comment">
                            {(field) => (
                                <div className="space-y-2">
                                    <FieldLabel className="font-semibold">Comment</FieldLabel>
                                    <Textarea
                                        placeholder="Write your experience..."
                                        rows={5}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </form.Field>
                    </div>
                </form>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 pb-8 px-8">
                <Button variant="ghost" onClick={() => form.reset()}>Reset</Button>
                <Button form="review-form" type="submit">Submit Review</Button>
            </CardFooter>
        </Card>
    )
}