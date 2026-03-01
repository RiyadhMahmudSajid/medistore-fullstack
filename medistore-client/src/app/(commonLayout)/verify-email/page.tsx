export const dynamic = "force-dynamic"
import { methods } from "better-auth/react"
import { redirect } from "next/navigation"


export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
const {token} = await searchParams
    console.log(token);
    if (!token) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-600 text-lg">
                    Invalid verification link.
                </p>
            </div>
        )
    }
    try {
        const res = await fetch(`${process.env.AUTH_URL}/verify-email?token=${token}`,
            {
                method: "GET",
                cache: "no-store"
            }

        )
        console.log(res);
        if (!res.ok) {
            return (
                <div className="flex h-screen items-center justify-center">
                    <p className="text-red-600 text-lg">
                        Token expired or already used.
                    </p>
                </div>
            )
        }
        if(res.ok){
           return redirect("/login")
        }

    } catch (err) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-600 text-lg">
                    Something went wrong. Please try again.
                </p>
            </div>
        )
    }
}
