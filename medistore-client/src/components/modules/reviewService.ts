import { env } from "@/env";
import { Review } from "@/types";
const API_URL = env.NEXT_PUBLIC_API_URL

export const reviewService = {
    createReview: async function (cookieHeader: string, review: Review, medicineId: string) {
        try {

            const res = await fetch(`${API_URL}/review/${medicineId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                },
                body: JSON.stringify(review)
            })
            const data = await res.json()
            
            if (data.error) {
                
                return { data: null, error: { message: "can not post " } }
            }
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "something went wrong" } }
        }
    },


    getReview: async function (cookieHeader: string) {
        try {
            const res = await fetch(`${API_URL}/review`, {
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                }
              
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            
            return { data: null, error: { err } };
        }
    },

    getSellerReview : async function (cookieHeader:string) {
        try {
            const res = await fetch(`${API_URL}/review/sellerReview`, {
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                }
              
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
            
            return { data: null, error: { err } };
        }
    }

  
}