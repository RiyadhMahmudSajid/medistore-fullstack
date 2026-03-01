import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL

const orderService = {
    getMyOrder: async function (cookieHeader: string) {
        try {
            const res = await fetch(`${API_URL}/order/myOrder`, {
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
    getSellerOrder: async function (cookieHeader: string) {

        try {
            const res = await fetch(`${API_URL}/order/myMedicineOrder`, {
                headers: {
                    "Content-Type": "application/json",

                    ...(cookieHeader && { Cookie: cookieHeader })
                },
                next: {
                    tags: ["SellerOrder"],
                },
            });
            const data = await res.json();
            return { data: data, error: null };
        } catch (err) {
           
            return { data: null, error: { err } };
        }
    },

    updateStatus: async function (cookieHeader: string,orderId:string,status:string) {
        try {

            const res = await fetch(`${API_URL}/order/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...(cookieHeader && { Cookie: cookieHeader })
                },
                body: JSON.stringify({ status })
            })
            const data = await res.json();
            return { data: data, error: null };

        } catch (err) {
            return { data: null, error: { message: "something went wrong" } }
        }
    }

    
}

export default orderService