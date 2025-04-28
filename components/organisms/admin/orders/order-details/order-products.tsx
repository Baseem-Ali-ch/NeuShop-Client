"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus, Trash2 } from "lucide-react";

interface OrderProductsProps {
  order: any;
}

export default function OrderProducts({ order }: OrderProductsProps) {
  const [items, setItems] = useState(order.items);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      quantity: newQuantity,
      total: newItems[index].price * newQuantity,
    };
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Calculate totals
  const subtotal = order.subtotal;
  const shipping = order.shipping?.cost || 0;
  const discount = order.discount || 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                        <img
                          src={item.image[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      {item.variant && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.variant}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span>${subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Discount
                </span>
                <span className="text-red-500">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
