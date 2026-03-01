export interface SellerOrderItem {
  medicine: {
    name: string;
  };
  quantity: number;
}


export interface SellerOrder {
  id: string;
  status: string;
  totalPrice: number;
  customer: {
    name: string;
    email: string;
  };
  order: SellerOrderItem[]; 
}