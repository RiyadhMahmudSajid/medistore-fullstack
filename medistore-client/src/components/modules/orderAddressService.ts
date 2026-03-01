import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const orderAddressService = {
  createAddress: async function (address: any, cookieHeader?: string) {
    try {
      const res = await fetch(`${API_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        body: JSON.stringify(address),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: "Failed to save address" } };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  createOrder: async function (orderPayload: any, cookieHeader?: string) {
    try {
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: "Failed to create order" } };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};

export default orderAddressService;