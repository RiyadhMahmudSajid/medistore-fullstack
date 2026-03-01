"use client";

import { Order } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  orders: Order[];
};

const GetMyOrder = ({ orders }: Props) => {
    
  return (
    <div className="rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Medicines</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.id.slice(0, 8)}...
              </TableCell>

              <TableCell>{order.status}</TableCell>

              <TableCell>৳ {order.totalPrice}</TableCell>

              <TableCell>{order.address.city}</TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {order?.order?.map((item) => (
                  <div key={item.id}>
                    {item.medicine.name} × {item.quantity}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetMyOrder;