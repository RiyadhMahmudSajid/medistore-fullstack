import { Address } from "./address";
import { OrderItem } from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

export type Order = {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  updateAt: string;

  addressId: string;
  customerId: string;

  address: Address;
  order: OrderItem[];
};