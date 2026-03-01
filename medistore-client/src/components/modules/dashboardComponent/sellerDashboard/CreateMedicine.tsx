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
import { createMedicinePost } from "@/action/medicineAction"
import { env } from "@/env"
import { Category } from "@/types"




const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z
    .number("Price must be a number")
    .positive("Price must be greater than 0"),
  manufacturer: z.string().min(2, "Manufacturer is required."),
  image: z.string().url("Image must be a valid URL."),
  stock: z
    .number("Stock must be a number")
    .min(0, "Stock cannot be negative"),
  sellerId: z.string(),
  categoryId: z.string().min(1, "Category is required."),
})

const API_IMG = process.env.NEXT_PUBLIC_API_IMG

export function CreateMedicineForm({ sellerId, categories, ...props }: React.ComponentProps<typeof Card> & { sellerId: string, categories: Category[] }) {
  

   
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_IMG}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.success ? data.data.display_url : null;
    } catch (error) {
      return null;
    }
  };
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      manufacturer: "",
      image: "",
      stock: 0,
      sellerId: sellerId,
      categoryId: "",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating medicine...")
      try {
       
        const res = await createMedicinePost(value)
       
        toast.success("Medicine created successfully", { id: toastId })

      } catch (error) {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })



  return (
    <Card className="max-w-4xl mx-auto border-none shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1 bg-primary/5 rounded-t-xl border-b border-primary/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-primary">Add New Medicine</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details to list a new medicine in the inventory.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8">
        <form
          id="medicine-form"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {/* Left Column */}
            <div className="space-y-6">
              {/* Name */}
              <form.Field name="name">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-semibold">Medicine Name</FieldLabel>
                    <Input
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. Paracetamol 500mg"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.isTouched && !field.state.meta.isValid && (
                      <FieldError className="text-xs text-destructive" errors={field.state.meta.errors} />
                    )}
                  </Field>
                )}
              </form.Field>

              {/* Manufacturer */}
              <form.Field name="manufacturer">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-semibold">Manufacturer</FieldLabel>
                    <Input
                      placeholder="e.g. Square Pharmaceuticals"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <form.Field name="price">
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="font-semibold">Price (TK)</FieldLabel>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                      />
                    </Field>
                  )}
                </form.Field>

                {/* Stock */}
                <form.Field name="stock">
                  {(field) => (
                    <Field className="space-y-2">
                      <FieldLabel className="font-semibold">Stock Qty</FieldLabel>
                      <Input
                        type="number"
                        placeholder="0"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Category */}
              <form.Field name="categoryId">
                {(field) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <select
                      className="w-full p-2 border rounded-md" 
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="">Select a Category</option>
                      {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} 
                        </option>
                      ))}
                    </select>
                  
                  </Field>
                )}
              </form.Field>

              {/* Image Upload Area */}
              <form.Field name="image">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-semibold">Medicine Image</FieldLabel>
                    <div className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/20 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer overflow-hidden">
                      {field.state.value ? (
                        <>
                          <img src={field.state.value} alt="Preview" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs font-medium">Change Image</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <svg className="h-8 w-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs text-muted-foreground">Click to upload image</p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer h-full"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const toastId = toast.loading("Uploading image...");
                            const url = await handleImageUpload(file);
                            if (url) {
                              field.handleChange(url);
                              toast.success("Uploaded!", { id: toastId });
                            } else {
                              toast.error("Failed!", { id: toastId });
                            }
                          }
                        }}
                      />
                    </div>
                  </Field>
                )}
              </form.Field>

              {/* Description */}
              <form.Field name="description">
                {(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-semibold">Description</FieldLabel>
                    <Textarea
                      placeholder="Describe medicine usage, side effects, etc."
                      rows={3}
                      className="resize-none"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              </form.Field>
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-3 pb-8 px-8 border-t border-primary/5 pt-6 bg-muted/20 rounded-b-xl">
        <Button
          type="button"
          variant="ghost"
          className="hover:bg-destructive/10 hover:text-destructive"
          onClick={() => form.reset()}
        >
          Reset Form
        </Button>

        <Button
          form="medicine-form"
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white px-8 shadow-lg shadow-primary/20 transition-transform active:scale-95"
        >
          Save Medicine
        </Button>
      </CardFooter>
    </Card>
  )
}
