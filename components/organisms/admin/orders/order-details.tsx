"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { mockOrders } from "@/data/mock-orders"
import OrderSummary from "./order-details/order-summary"
import OrderProducts from "./order-details/order-products"
import OrderCustomer from "./order-details/order-customer"
import OrderHistory from "./order-details/order-history"
import OrderStatusUpdate from "./order-status-update"

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  orderId: string | null
}

export default function OrderDetails({ isOpen, onClose, orderId }: OrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("summary")

  // Find the order from mock data
  const order = orderId ? mockOrders.find((order) => order.id === orderId) : null

  if (!order) {
    return null
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
        <SheetHeader className="space-y-2 pb-4 border-b">
          <SheetTitle className="flex justify-between items-center">
            <span>Order {order.id}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {new Date(order.date).toLocaleString()}
            </span>
          </SheetTitle>
          <SheetDescription>View and manage order details</SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="history">Notes & History</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              <OrderSummary order={order} />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <OrderProducts order={order} />
            </TabsContent>

            <TabsContent value="customer" className="space-y-6">
              <OrderCustomer customer={order.customer} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <OrderHistory order={order} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="pt-4 border-t">
          <OrderStatusUpdate order={order} />
        </div>

        <SheetFooter className="pt-4 border-t mt-6">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
