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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "@tanstack/react-form"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import * as z from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({

  email: z.string()
    .min(1, "Please select a role"),
  password: z
    .string()
    .min(8, "Description must be at least 8 characters."),
 
})


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "https://medistore-client-beta.vercel.app"
    })
    
  }

  const form = useForm({
    defaultValues: {
   
      email: "",
      password: "",
   
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      
      const tostId = toast.loading("LogIn User")
      try {
       
        const { data, error } = await authClient.signIn.email(value)
        
        if (error) {
          toast.error(error.message, { id: tostId })
        }
        toast.success("LogIn Successfully", { id: tostId })
         router.push("/") 
        router.refresh() 
      } catch (err) {
        toast.error("Some thing went wrong", { id: tostId })

      }
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signin-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>

          <FieldGroup>

            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>)
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>)
              }}
            />


          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" form="signin-form" type="submit">
          Login
        </Button>
        <Button
        className="w-full"
        onClick={() => handleGoogleLogin()} variant="outline" type="button">
          Login with Google
        </Button>
        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href='/signup'>Sign up</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}
