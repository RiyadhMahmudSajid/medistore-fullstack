import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL
const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                   
                    cookie: cookieStore.toString() 
                },
                cache: "no-store"
            });
          
           
            if (!res.ok) return { data: null, error: { message: "Failed to fetch session" } };

            const session = await res.json();

            if (session === null) {
                return { data: null, error: { message: "Session is missing" } };
            }

            return { data: session, error: null };

        } catch (err) {
            
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    }
};

export default userService;