"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface OrderStatusUpdateProps {
  order: any
}

export default function OrderStatusUpdate({ order }: OrderStatusUpdateProps) {
  const [status, setStatus] = useState(order.status)
  const [notifyCustomer, setNotifyCustomer] = useState(true)
  const [message, setMessage] = useState("")

  const handleStatusChange = (value: string) => {
    setStatus(value)

    // Set default message based on status
    switch (value) {
      case "processing":
        setMessage("Your order is now being processed. We'll update you when it ships.")
        break
      case "shipped":
        setMessage(
          "Good news! Your order has been shipped. You can track your package with the tracking number provided.",
        )
        break
      case "delivered":
        setMessage("Your order has been delivered. Thank you for shopping with us!")
        break
      case "cancelled":
        setMessage("Your order has been cancelled as requested. Please contact us if you have any questions.")
        break
      default:
        setMessage("")
    }
  }

  const handleUpdateStatus = () => {
    // In a real app, you would update the order status in the database
    console.log(`Updating order ${order.id} status to ${status}`)
    if (notifyCustomer) {
      console.log(`Sending notification to customer: ${message}`)
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="notify-customer" checked={notifyCustomer} onCheckedChange={setNotifyCustomer} />
            <Label htmlFor="notify-customer">Notify customer</Label>
          </div>

          {notifyCustomer && (
            <Textarea
              placeholder="Message to customer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleUpdateStatus}>Update Status</Button>
      </div>
    </div>
  )
}
