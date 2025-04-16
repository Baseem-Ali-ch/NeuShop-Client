"use client"

import { useState, useEffect } from "react"
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
import OrderSummary from "./order-details/order-summary"
import OrderProducts from "./order-details/order-products"
import OrderCustomer from "./order-details/order-customer"
import OrderHistory from "./order-details/order-history"
import OrderStatusUpdate from "./order-status-update"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface Customer {
  name: string
  email: string
  phone: string
  avatar?: string
}

interface Order {
  id: string
  date: string
  customer: Customer
  items: OrderItem[]
  total: number
  paymentStatus: string
  status: string
  shipping: {
    address: string
    apartment: string
    city: string
    state: string
    zipCode: string
    country: string
    shippingMethod: string
    trackingNumber?: string
    carrier?: string
  }
  payment: {
    method: string
    paymentIntentId: string
  }
  discount: number
}

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  orderId: string | null
}

export default function OrderDetails({ isOpen, onClose, orderId }: OrderDetailsProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch order details
  useEffect(() => {
    if (!orderId || !isOpen) {
      setOrder(null)
      return
    }

    const fetchOrder = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("No access token found")
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/orders/${orderId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch order")
        }

        const data = await response.json()
        const mappedOrder: Order = {
          id: data.order._id,
          date: data.order.createdAt,
          customer: {
            name: `${data.order.customer.firstName} ${data.order.customer.lastName}`,
            email: data.order.customer.email,
            phone: data.order.customer.phone,
            avatar: "", // Add avatar URL if available
          },
          items: data.order.items,
          total: data.order.totalAmount,
          paymentStatus: data.order.payment.status === "succeeded" ? "paid" : data.order.payment.status,
          status: data.order.status,
          shipping: data.order.shipping,
          payment: {
            method: data.order.payment.method,
            paymentIntentId: data.order.payment.paymentIntentId,
          },
          discount: data.order.discount,
        }

        setOrder(mappedOrder)
      } catch (err) {
        setError("Unable to load order details.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, isOpen])

  if (!orderId || !isOpen) {
    return null
  }

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <div className="text-center py-12">
            <div className="h-8 w-8 mx-auto rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading order...</p>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  if (error || !order) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <SheetHeader className="space-y-2 pb-4 border-b">
            <SheetTitle>Order Not Found</SheetTitle>
          </SheetHeader>
          <div className="py-6 text-center">
            <p className="text-red-500 dark:text-red-400">{error || "Order details unavailable."}</p>
            <Button variant="outline" className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
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