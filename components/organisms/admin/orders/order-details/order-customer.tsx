"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, DollarSign, ShoppingBag } from "lucide-react"
import { format } from "date-fns"

interface OrderCustomerProps {
  customer: any
}

export default function OrderCustomer({ customer }: OrderCustomerProps) {
  // Mock previous orders
  const previousOrders = [
    {
      id: "ORD-1234",
      date: "2023-05-15T10:30:00",
      total: 129.99,
      status: "delivered",
    },
    {
      id: "ORD-9876",
      date: "2023-03-22T14:15:00",
      total: 89.5,
      status: "delivered",
    },
    {
      id: "ORD-5432",
      date: "2023-01-10T09:45:00",
      total: 210.75,
      status: "delivered",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  // Calculate lifetime value
  const lifetimeValue = previousOrders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-lg">{customer.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Customer since {format(new Date(customer.createdAt || "2023-01-01"), "MMM yyyy")}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div>{customer.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <div>{customer.phone || "No phone provided"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Lifetime Value</div>
                    <div className="font-medium">${lifetimeValue.toFixed(2)}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShoppingBag className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
                    <div>{previousOrders.length + 1}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Billing Address</div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div>{customer.name}</div>
                    <div>{customer.address?.street}</div>
                    <div>
                      {customer.address?.city}, {customer.address?.state} {customer.address?.zip}
                    </div>
                    <div>{customer.address?.country || "United States"}</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Shipping Address</div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div className="text-sm">
                    <div>{customer.name}</div>
                    <div>{customer.address?.street}</div>
                    <div>
                      {customer.address?.city}, {customer.address?.state} {customer.address?.zip}
                    </div>
                    <div>{customer.address?.country || "United States"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
