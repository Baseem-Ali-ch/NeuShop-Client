"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CreditCard,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

interface OrderSummaryProps {
  order: any;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
      case "refunded":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
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

  // Validate and format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown Date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return format(date, "MMM dd, yyyy h:mm a");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Order ID</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Date Placed
              </span>
              <span className="font-medium">{formatDate(order.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Channel</span>
              <span className="font-medium">{order.channel || "Website"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <Badge
                variant="outline"
                className={getStatusColor(order.status)}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={order.customer.avatar}
                  alt={order.customer.name}
                />
                <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {order.customer.email}
                </div>
              </div>
            </div>
            <div className="text-sm">
              <div className="text-gray-500 dark:text-gray-400 mb-1">
                Contact
              </div>
              <div>{order.customer.phone || "No phone provided"}</div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Customer Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">
                  {order.payment?.method || "Credit Card"}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {order.payment?.cardBrand || "Visa"} ending in{" "}
                  {order.payment?.last4 || "4242"}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Transaction ID
              </span>
              <span className="font-medium">
                {order.payment?.transactionId ||
                  "txn_1K2OuRCZ6qsJgndJQbcYYzjT"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Payment Status
              </span>
              <Badge
                variant={order.paymentStatus === "paid" ? "success" : "outline"}
              >
                {order.paymentStatus.charAt(0).toUpperCase() +
                  order.paymentStatus.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">
                  {order.shipping?.method || "Standard Shipping"}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {order.shipping?.address}, {order.shipping?.city},{" "}
                  {order.shipping?.state} {order.shipping?.zipCode}
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 mb-1">
                Tracking Number
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter tracking number"
                  value={order.shipping?.trackingNumber || ""}
                  className="h-9"
                />
                <Button size="sm" className="h-9">
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.timeline?.map((event: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                {getStatusIcon(event.status)}
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(event.timestamp)}
                  </div>
                  {event.note && (
                    <div className="text-sm mt-1">{event.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}