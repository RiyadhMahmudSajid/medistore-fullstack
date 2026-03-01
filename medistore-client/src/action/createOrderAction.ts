"use server";

import { cookies } from "next/headers";

import orderAddressService from "@/components/modules/orderAddressService";

interface CheckoutPayload {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  customerId: string;
  totalPrice: number;
  items: {
    medicineId: string;
    quantity: number;
    price: number;
  }[];
}

export const createOrderAction = async (payload:CheckoutPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();
     

    
    const addressRes = await orderAddressService.createAddress(
      {
        fullName: payload.fullName,
        phone: payload.phone,
        city: payload.city,
        area: payload.area,
      },
      cookieHeader
    );

    if (addressRes.error) {
      return addressRes;
    }

 
    const orderRes = await orderAddressService.createOrder(
      {
        customerId: payload.customerId,
        addressId: addressRes.data.id,
        totalPrice: payload.totalPrice,
        items: payload.items,
      },
      cookieHeader
    );

    return orderRes;
  } catch (error) {
    return { data: null, error: { message: "Internal Server Error" } };
  }
};