"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { updateOrderStatus } from "@/lib/admin/orderApi"

interface OrderStatusUpdateProps {
  order: {
    id: string;
    status: string;
  };
  onStatusUpdate?: () => void;
}

const ORDER_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export default function OrderStatusUpdate({ order, onStatusUpdate }: OrderStatusUpdateProps) {
  const [status, setStatus] = useState(order.status)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = (value: string) => {
    setStatus(value)
  }

  const handleUpdateStatus = async () => {
    try {
      setIsUpdating(true)
      await updateOrderStatus(order.id, status)
      toast.success("Order status updated successfully")
      onStatusUpdate?.()
    } catch (error) {
      toast.error("Failed to update order status")
      console.error("Error updating status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Update Order Status</div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((statusOption) => (
                <SelectItem 
                  key={statusOption.value} 
                  value={statusOption.value}
                >
                  {statusOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleUpdateStatus} 
          disabled={isUpdating || status === order.status}
        >
          {isUpdating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  )
}