import { Review } from "./review";

export interface Medicine {
  id?: string;             
  name: string;            
  description: string;     
  price: number;           
  manufacturer: string;    
  image: string;           
  stock: number;           
  sellerId?: string;    
  categoryId?:string    
  reviews?:Review
}