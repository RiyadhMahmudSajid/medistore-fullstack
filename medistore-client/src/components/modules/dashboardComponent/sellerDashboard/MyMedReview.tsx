"use client";

import React from 'react';
import { Medicine } from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from 'next/image';

const MyMedReview = ({ medicineReview }: { medicineReview: Medicine[] }) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-secondary/30">
                    <TableRow>
                        <TableHead className="w-[250px]">Medicine Info</TableHead>
                        <TableHead className="text-center">Stock</TableHead>
                        <TableHead className="text-center">Total Reviews</TableHead>
                        <TableHead className="text-center">Avg. Rating</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medicineReview?.map((med) => {
                      
                        const reviewsList = med.reviews && Array.isArray(med.reviews) ? med.reviews : [];

                        
                        const avgRating = reviewsList.length > 0
                            ? (reviewsList.reduce((acc, rev) => acc + rev.rating, 0) / reviewsList.length).toFixed(1)
                            : "0";

                        return (
                            <TableRow key={med.id} className="hover:bg-secondary/10">
                                <TableCell className="flex items-center gap-3">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border">
                                        <Image
                                            src={med.image || "/placeholder.png"}
                                            alt={med.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{med.name}</span>
                                        <span className="text-[10px] text-muted-foreground">{med.manufacturer}</span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-center">
                                    <Badge variant={med.stock > 0 ? "outline" : "destructive"}>
                                        {med.stock} in stock
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-center font-medium">
                                    {reviewsList.length} Reviews
                                </TableCell>

                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="font-bold text-yellow-600">{avgRating}</span>
                                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    </div>
                                </TableCell>

                                <TableCell className="text-right font-bold text-primary">
                                    ৳{med.price}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>

            </Table>

            {medicineReview?.length === 0 && (
                <div className="p-10 text-center text-muted-foreground">
                    No medicines found.
                </div>
            )}
        </div>
    );
};

export default MyMedReview;
