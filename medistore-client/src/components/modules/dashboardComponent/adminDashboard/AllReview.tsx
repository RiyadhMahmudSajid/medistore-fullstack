"use client";

import React from 'react';
import { Review } from '@/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import Image from 'next/image';

const AllReview = ({ review }: { review: Review[] }) => {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableCaption>A list of recent medicine reviews.</TableCaption>
        <TableHeader className="bg-secondary/30">
          <TableRow>
            <TableHead className="w-[250px]">Medicine</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
       <TableBody>
  {review?.map((rev) => { 
    if (!rev || !rev.medicine) {
      return null;
    }

    return (
      <TableRow key={rev.id} className="hover:bg-secondary/10">
        <TableCell className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border">
            <Image 
              src={rev.medicine.image || "/placeholder.png"} 
              alt={rev.medicine.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">{rev.medicine.name}</span>
            <span className="text-[10px] text-muted-foreground">
              {rev.medicine.manufacturer}
            </span>
          </div>
        </TableCell>

        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="font-bold text-yellow-600">{rev.rating}</span>
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          </div>
        </TableCell>

        <TableCell className="max-w-[300px] text-sm italic text-muted-foreground">
          "{rev.comment}"
        </TableCell>

        <TableCell className="text-right">
          <button className="text-xs text-destructive hover:underline font-medium">
            Delete
          </button>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>
      </Table>

      {review?.length === 0 && (
        <div className="p-10 text-center text-muted-foreground">
          No reviews available yet.
        </div>
      )}
    </div>
  );
};

export default AllReview;
