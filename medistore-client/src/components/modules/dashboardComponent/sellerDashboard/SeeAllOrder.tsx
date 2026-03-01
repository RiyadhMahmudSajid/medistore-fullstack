"use client";

import { SellerOrder } from '@/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateStatus } from '@/action/medicineBySeller';

const SeeAllOrder = ({ orders }: { orders: SellerOrder[] }) => {
  
  const handleStatusChange = async(orderId: string, newStatus: string) => {
    

    const result = await updateStatus(orderId,newStatus)
    
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/50">
          <TableRow>
            <TableHead className="font-bold">Customer</TableHead>
            <TableHead className="font-bold">Medicines</TableHead>
            <TableHead className="font-bold text-center">Total Price</TableHead>
            <TableHead className="font-bold text-center">Current Status</TableHead>
            <TableHead className="font-bold text-right">Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id} className="hover:bg-secondary/20 transition-colors">
             
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{order.customer.name}</span>
                  <span className="text-[10px] text-muted-foreground">{order.customer.email}</span>
                </div>
              </TableCell>

            
              <TableCell>
                <div className="space-y-1">
                  {order.order.map((item, idx) => (
                    <div key={idx} className="text-xs flex items-center gap-1">
                      <span className="bg-primary/10 text-primary px-1.5 rounded font-medium">
                        x{item.quantity}
                      </span>
                      {item.medicine.name}
                    </div>
                  ))}
                </div>
              </TableCell>

      
              <TableCell className="text-center font-bold text-green-600">
                ৳{order.totalPrice}
              </TableCell>

         
              <TableCell className="text-center">
                <Badge 
                  variant={order.status === "CANCELLED" ? "destructive" : "secondary"}
                  className="capitalize"
                >
                  {order.status.toLowerCase()}
                </Badge>
              </TableCell>

        
              <TableCell className="text-right">
                <Select 
                  defaultValue={order.status} 
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-[130px] h-8 ml-auto text-xs">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PLACED">Placed</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPING">Shipping</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {orders?.length === 0 && (
        <div className="p-10 text-center text-muted-foreground">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default SeeAllOrder;
