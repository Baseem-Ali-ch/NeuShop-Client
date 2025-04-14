"use client"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { selectSelectedOrders, deselectAllOrders } from "@/store/slices/orderSlice"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Printer, Tag, Trash2, X } from "lucide-react"

export default function BulkActionsBar() {
  const selectedOrders = useAppSelector(selectSelectedOrders)
  const dispatch = useAppDispatch()

  const handleClearSelection = () => {
    dispatch(deselectAllOrders())
  }

  const handleStatusChange = (status: string) => {
    // Implement bulk status update logic
    console.log(`Updating ${selectedOrders.length} orders to status: ${status}`)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg py-3 px-4 z-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-3">
            {selectedOrders.length} {selectedOrders.length === 1 ? "order" : "orders"} selected
          </span>
          <Button variant="ghost" size="sm" onClick={handleClearSelection} className="h-8">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center">
            <span className="text-sm mr-2">Update status:</span>
            <Select onValueChange={handleStatusChange}>
              <SelectTrigger className="h-8 w-[140px]">
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

          <Button variant="outline" size="sm" className="h-8">
            <Printer className="h-4 w-4 mr-2" />
            Print Invoices
          </Button>

          <Button variant="outline" size="sm" className="h-8">
            <Tag className="h-4 w-4 mr-2" />
            Print Labels
          </Button>

          <Button variant="outline" size="sm" className="h-8">
            <FileDown className="h-4 w-4 mr-2" />
            Export Selected
          </Button>

          <Button variant="destructive" size="sm" className="h-8">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  )
}
