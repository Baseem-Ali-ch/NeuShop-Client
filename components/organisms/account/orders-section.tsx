"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp, RefreshCw, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  date: string
  total: number
  status: string
  items: OrderItem[]
  tracking?: string
  carrier?: string
}

export default function OrdersSection() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }

        const data = await response.json()
        console.log('data', data)
        
        // Map MongoDB order data to component format
        if (!data.orders || !Array.isArray(data.orders)) {
          throw new Error("Invalid orders data format");
        }
  
        // Map MongoDB order data to component format
        const mappedOrders: Order[] = data.orders.map((order: any) => ({
          id: order.orderId,
          date: new Date(order.createdAt).toISOString().split("T")[0],
          total: order.total,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          items: order.items.map((item: any, index: number) => ({
            id: index + 1,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || "/placeholder.svg",
          })),
          tracking: order.shippingInfo?.trackingNumber || "N/A",
          carrier: order.shippingInfo?.carrier || "N/A",
        }));

        setOrders(mappedOrders)
      } catch (err) {
        setError("Unable to load orders. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">My Orders</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </Button>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="h-8 w-8 mx-auto rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
              >
                {/* Order Header */}
                <div
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">{order.id}</h3>
                      <span
                        className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {new Date(order.date).toLocaleDateString()} • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Implement reorder logic
                        console.log(`Reordering ${order.id}`)
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reorder
                    </Button>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="relative w-16 h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden mr-4 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
                                    item.image || "/placeholder.svg"
                                  }`}
                                  alt={item.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-white">{item.name}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  ${item.price.toFixed(2)} • Qty: {item.quantity}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                                onClick={() => {
                                  // TODO: Implement buy again logic
                                  console.log(`Buying ${item.name} again`)
                                }}
                              >
                                Buy Again
                              </Button>
                            </div>
                          ))}
                        </div>

                        {/* Tracking Information */}
                        {order.tracking && order.carrier && (
                          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tracking Information</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Carrier: {order.carrier} • Tracking #: {order.tracking}
                            </p>
                            <Button
                              variant="link"
                              className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-1"
                              onClick={() => {
                                // TODO: Implement tracking link
                                console.log(`Tracking ${order.tracking}`)
                              }}
                            >
                              Track Package
                            </Button>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                            onClick={() => {
                              // TODO: Implement view invoice
                              console.log(`Viewing invoice for ${order.id}`)
                            }}
                          >
                            View Invoice
                          </Button>
                          {order.status.toLowerCase() !== "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                              onClick={() => {
                                // TODO: Implement cancel order
                                console.log(`Cancelling ${order.id}`)
                              }}
                            >
                              Cancel Order
                            </Button>
                          )}
                          {order.status.toLowerCase() === "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                              onClick={() => {
                                // TODO: Implement return items
                                console.log(`Returning items for ${order.id}`)
                              }}
                            >
                              Return Items
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                            onClick={() => {
                              // TODO: Implement contact support
                              console.log(`Contacting support for ${order.id}`)
                            }}
                          >
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}