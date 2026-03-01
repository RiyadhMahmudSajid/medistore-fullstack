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
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { toast } from "sonner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { createCategoryPost } from "@/action/categoryAction"

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
})

export function CreateCategoryByAdmin({ ...props }: React.ComponentProps<typeof Card>) {
  
  const form = useForm({
    defaultValues: {
      name: "",
    },
 
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating category...") 
      try {
        
        
        const res = await createCategoryPost(value)
        
        if (res?.error) {
           toast.error(res.error.message || "Failed to create", { id: toastId })
           return
        }

        toast.success("Category created successfully", { id: toastId })
        form.reset() 
      } catch (error) {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  return (
    <Card className="max-w-md mx-auto border-none shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="bg-primary/5 rounded-t-xl border-b border-primary/10 pb-6">
        <CardTitle className="text-2xl font-bold text-primary">Add New Category</CardTitle>
        <CardDescription>Enter the name of the new medicine category.</CardDescription>
      </CardHeader>

      <CardContent className="pt-8">
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-semibold">Category Name</FieldLabel>
                  <Input
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Antibiotics"
                    value={field.state.value}
                  
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <FieldError className="text-xs text-destructive" errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-3 pb-8 px-8 border-t border-primary/5 pt-6 bg-muted/20 rounded-b-xl">
        <Button type="button" variant="ghost" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button form="category-form" type="submit" className="bg-primary text-white px-8">
          Save Category
        </Button>
      </CardFooter>
    </Card>
  )
}