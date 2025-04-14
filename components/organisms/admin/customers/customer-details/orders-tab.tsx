"use client"

import { ShoppingBag, ArrowRight, Truck, Package, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CustomerOrdersTabProps {
  customerId: string
}

export default function CustomerOrdersTab({ customerId }: CustomerOrdersTabProps) {
  // In a real app, this would fetch the customer's orders from Redux
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-11-15",
      total: "$359.95",
      status: "delivered",
      items: 3,
    },
    {
      id: "ORD-1186",
      date: "2023-10-02",
      total: "$127.50",
      status: "delivered",
      items: 1,
    },
    {
      id: "ORD-1092",
      date: "2023-09-18",
      total: "$214.30",
      status: "delivered",
      items: 2,
    },
    {
      id: "ORD-941",
      date: "2023-08-05",
      total: "$89.99",
      status: "cancelled",
      items: 1,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Processing</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Calculate order statistics
  const totalSpent = orders.reduce((sum, order) => sum + Number.parseFloat(order.total.replace("$", "")), 0)
  const avgOrderValue = orders.length > 0 ? (totalSpent / orders.length).toFixed(2) : "0.00"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</h4>
              <ShoppingBag className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Order</h4>
              <Package className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold">${avgOrderValue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Frequency</h4>
              <Truck className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{orders.length > 0 ? "Monthly" : "N/A"}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <Button variant="outline" size="sm">
            View All Orders <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Order Timeline</h3>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {orders.length > 0 ? (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">First Order</span>
                      <span className="text-sm text-gray-500">{orders[orders.length - 1].date}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Most Recent Order</span>
                      <span className="text-sm text-gray-500">{orders[0].date}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        {orders.length} orders over{" "}
                        {Math.round(
                          (new Date().getTime() - new Date(orders[orders.length - 1].date).getTime()) /
                            (1000 * 60 * 60 * 24 * 30),
                        )}{" "}
                        months
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">No order history available.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
