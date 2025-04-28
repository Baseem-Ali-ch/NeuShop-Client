"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { cancelOrder, getOrders, returnOrder } from "@/lib/user/accountApi";
import { OrderProgress } from "@/components/ui/order-progres";
import { Invoice } from "@/components/ui/invoice";
import { CancelOrderDialog } from "@/components/ui/cancel-order";
import { ReturnOrderDialog } from "@/components/ui/return-order";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
  tracking?: string;
  carrier?: string;
  orderId?: string;
}

export default function OrdersSection() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] =
    useState<Order | null>(null);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);

  // Fetch orders from API
  useEffect(() => {
    // Update the fetchOrders function inside useEffect
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getOrders();
        console.log("Raw response:", response);

        // Check if response is an array
        const ordersData = Array.isArray(response) ? response : [response];

        // Map MongoDB order data to component format
        const mappedOrders: Order[] = ordersData.map((order: any) => ({
          id: order._id,
          orderId: order.orderId,
          date: new Date(order.createdAt).toLocaleDateString(),
          total: order.total,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          items: order.items.map((item: any) => ({
            id: item._id, // Using item's _id
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || "/placeholder.svg",
          })),
          tracking: "N/A",
          carrier: "N/A", // Add if available in your data
        }));

        console.log("Mapped orders:", mappedOrders);
        setOrders(mappedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to load orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (reason: string) => {
    if (!cancelOrderId) return;

    try {
      await cancelOrder(cancelOrderId, reason);
      setOrders(
        orders.map((order) =>
          order.id === cancelOrderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
    }
  };

  const handleReturnOrder = async (reason: string) => {
    if (!returnOrderId) return;

    try {
      // TODO: Implement API call
      await returnOrder(returnOrderId, reason);

      // Update order status locally
      setOrders(
        orders.map((order) =>
          order.id === returnOrderId
            ? { ...order, status: "Return Requested" }
            : order
        )
      );
    } catch (error) {
      console.error("Error submitting return request:", error);
      throw error;
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          My Orders
        </h1>

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
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
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
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Loading orders...
            </p>
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
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {order.orderId}
                      </h3>
                      <span
                        className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {new Date(order.date).toLocaleDateString()} • $
                      {order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center">
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
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Order Items
                        </h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="relative w-16 h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden mr-4 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  ${item.price.toFixed(2)} • Qty:{" "}
                                  {item.quantity}
                                </p>
                              </div>
                              {/* <Button
                                variant="outline"
                                size="sm"
                                className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                                onClick={() => {
                                  // TODO: Implement buy again logic
                                  console.log(`Buying ${item.name} again`);
                                }}
                              >
                                Buy Again
                              </Button> */}
                            </div>
                          ))}
                        </div>

                        {/* Add Order Progress */}
                        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                            Order Status
                          </h4>
                          <OrderProgress status={order.status} />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {order.status.toLowerCase() === "delivered" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                              onClick={() => setSelectedInvoiceOrder(order)}
                            >
                              View Invoice
                            </Button>
                          )}

                          {order.status.toLowerCase() !== "delivered" &&
                            order.status.toLowerCase() !== "returned" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCancelOrderId(order.id);
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
                              onClick={(e) => {
                                e.stopPropagation();
                                setReturnOrderId(order.id);
                              }}
                            >
                              Return Order
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                            onClick={() => {
                              // TODO: Implement contact support
                              console.log(`Contacting support for ${order.id}`);
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
            <p className="text-gray-600 dark:text-gray-400">
              No orders found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {selectedInvoiceOrder && (
        <Invoice
          isOpen={true}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}

      {cancelOrderId && (
        <CancelOrderDialog
          orderId={cancelOrderId}
          isOpen={true}
          onClose={() => setCancelOrderId(null)}
          onCancel={handleCancelOrder}
        />
      )}

      {returnOrderId && (
        <ReturnOrderDialog
          orderId={returnOrderId}
          isOpen={true}
          onClose={() => setReturnOrderId(null)}
          onReturn={handleReturnOrder}
        />
      )}
    </div>
  );
}
