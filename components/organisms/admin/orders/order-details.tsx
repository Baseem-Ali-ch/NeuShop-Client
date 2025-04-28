"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import OrderSummary from "./order-details/order-summary";
import OrderProducts from "./order-details/order-products";
import OrderCustomer from "./order-details/order-customer";
import OrderStatusUpdate from "./order-status-update";
import { fetchOrderDetails } from "@/lib/admin/orderApi";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  paymentStatus: string;
  status: string;
  shipping: {
    address: string;
    apartment: string | undefined;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    shippingMethod: string;
    trackingNumber?: string;
    carrier?: string;
  };
  payment: {
    method: string;
    paymentIntentId: string;
  };
  discount: number;
}

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

export default function OrderDetails({
  isOpen,
  onClose,
  orderId,
}: OrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || !isOpen) {
      setOrder(null);
      return;
    }

    const getOrderDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const orderData = await fetchOrderDetails(orderId);
        // Transform API response to match Order interface
        const transformedOrder: Order = {
          id: orderData._id,
          date: orderData.createdAt,
          customer: {
            name: orderData.paymentInfo.cardholderName,
            email: "unknown@example.com", // Fetch from userId if available
            phone: "N/A", // Fetch from userId if available
            avatar: "/placeholder.svg",
          },
          items: orderData.items.map((item: any, index: number) => ({
            id: index + 1,
            name: item.name,
            price: item.price / 100, // Convert cents to dollars
            quantity: item.quantity,
            image: item.image || "/placeholder.svg",
          })),
          total: orderData.total / 100, // Convert cents to dollars
          paymentStatus: orderData.paymentStatus,
          status: orderData.status,
          shipping: {
            address: orderData.shippingInfo.address,
            apartment: orderData.shippingInfo.apartment,
            state: orderData.shippingInfo.state,
            zipCode: orderData.shippingInfo.zipCode,
            country: orderData.shippingInfo.country,
            shippingMethod: "Standard", // Update if available
            // trackingNumber: orderData.shippingInfo.trackingNumber,
            // carrier: orderData.shippingInfo.carrier,
            city: orderData.shippingInfo.city,
          },
          payment: {
            method: orderData.paymentInfo.paymentMethod,
            paymentIntentId: orderData.paymentInfo.paymentIntentId || "N/A",
          },
          // discount: orderData.discount || 0,
        };
        setOrder(transformedOrder);
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError(err.message || "Unable to load order details.");
      } finally {
        setIsLoading(false);
      }
    };

    getOrderDetails();
  }, [orderId, isOpen]);

  const handleStatusUpdate = async () => {
    await fetchOrderDetails(orderId!);
  };

  if (!orderId || !isOpen) {
    return null;
  }

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <div className="text-center py-12">
            <div className="h-8 w-8 mx-auto rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Loading order...
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (error || !order) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <SheetHeader className="space-y-2 pb-4 border-b">
            <SheetTitle>Order Not Found</SheetTitle>
          </SheetHeader>
          <div className="py-6 text-center">
            <p className="text-red-500 dark:text-red-400">
              {error || "Order details unavailable."}
            </p>
            <Button variant="outline" className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
        <SheetHeader className="space-y-2 pb-4 border-b">
          <SheetTitle className="flex justify-between items-center">
            <span>Order {order.id}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {order.date
                ? new Date(order.date).toLocaleString()
                : "Unknown Date"}
            </span>
          </SheetTitle>
          <SheetDescription>View and manage order details</SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <Tabs
            defaultValue="summary"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
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
          </Tabs>
        </div>

        <div className="pt-4 border-t">
          <OrderStatusUpdate
            order={order}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>

        <SheetFooter className="pt-4 border-t mt-6">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
