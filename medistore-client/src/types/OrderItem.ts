import { Medicine } from "./medicine.types";

export type OrderItem = {
  id: string;
  orderId: string;
  medicineId: string;
  quantity: number;
  price: number;

  medicine: Medicine;
};