"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectOrder,
  deselectOrder,
  selectAllOrders,
  deselectAllOrders,
  selectSelectedOrders,
} from "@/store/slices/orderSlice";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Eye,
  Printer,
  Ban,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrders } from "@/lib/admin/orderApi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

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
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  items: OrderItem[];
  total: number;
  tax: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
}

interface OrderTableProps {
  onViewOrder: (orderId: string) => void;
}

export default function OrderTable({ onViewOrder }: OrderTableProps) {
  const dispatch = useAppDispatch();
  const selectedOrders = useAppSelector(selectSelectedOrders);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getOrders();
        console.log("API response:", response);

        if (!response.orders || !Array.isArray(response.orders)) {
          throw new Error("Invalid response format");
        }

        const mappedOrders: Order[] = response.orders.map((order: any) => ({
          id: order._id,
          date: order.createdAt,
          customer: {
            name: order.paymentInfo?.cardholderName || "Unknown Customer",
            email: "unknown@example.com", // Fetch from userId if available
            avatar: "/placeholder.svg",
          },
          items: order.items.map((item: any, index: number) => ({
            id: index + 1,
            name: item.name || "Product",
            price: item.price / 100 || 0, // Convert cents to dollars
            quantity: item.quantity || 0,
            image: item.image || "/placeholder.svg",
          })),
          total: order.subtotal / 100 || 0, // Convert cents to dollars
          tax: order.tax / 100 || 0, // Convert cents to dollars
          totalAmount: order.total / 100 || 0, // Convert cents to dollars
          paymentStatus: order.paymentStatus || "pending",
          status: order.status || "pending",
        }));

        console.log("Mapped orders:", mappedOrders);
        setOrders(mappedOrders);
      } catch (err: any) {
        console.error("Fetch error:", err.message);
        setError(err.message || "Unable to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortField) return 0;
    const direction = sortDirection === "asc" ? 1 : -1;
    if (sortField === "id") {
      return direction * a.id.localeCompare(b.id);
    } else if (sortField === "date") {
      return (
        direction * (new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    } else if (sortField === "total") {
      return direction * (a.total - b.total);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = sortedOrders.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="h-8 w-8 mx-auto rounded-full border-2 border-t-transparent border-gray-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Loading orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Order ID
                  {sortField === "id" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date & Time
                  {sortField === "date" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Items</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("total")}
              >
                <div className="flex items-center">
                  Total
                  {sortField === "total" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {order.date
                    ? format(
                        new Date(order.date),
                        "MMM dd, yyyy h:mm a"
                      )
                    : "Unknown Date"}
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 cursor-default">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span>{order.items.length}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <div className="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="h-6 w-6 object-contain"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {item.quantity} × ${item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="font-medium">
                  ${order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getPaymentStatusColor(order.paymentStatus)}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(order.status)}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewOrder(order.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        <Ban className="mr-2 h-4 w-4" />
                        Block
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(endIndex, orders.length)}
            </span>{" "}
            of <span className="font-medium">{orders.length}</span> orders
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px] ml-2">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 3 + i;
                if (pageNum > totalPages) {
                  pageNum = totalPages - (4 - i);
                }
              }
              return (
                <Button
                  key={i}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 mx-1"
                  onClick={() => setCurrentPage(pageNum)}
                  disabled={pageNum > totalPages}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}