"use client"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { setStatusFilter } from "@/store/slices/orderSlice"
import { cn } from "@/lib/utils"
import { mockOrderCounts } from "@/data/mock-orders"

type OrderStatus = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export default function StatusTabs() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("all")
  const dispatch = useAppDispatch()

  const handleTabChange = (status: OrderStatus) => {
    setActiveTab(status)
    dispatch(setStatusFilter(status))
  }

  const tabs = [
    { id: "all", label: "All Orders", count: mockOrderCounts.all },
    { id: "pending", label: "Pending", count: mockOrderCounts.pending },
    { id: "processing", label: "Processing", count: mockOrderCounts.processing },
    { id: "shipped", label: "Shipped", count: mockOrderCounts.shipped },
    { id: "delivered", label: "Delivered", count: mockOrderCounts.delivered },
    { id: "cancelled", label: "Cancelled", count: mockOrderCounts.cancelled },
    { id: "refunded", label: "Refunded", count: mockOrderCounts.refunded },
  ]

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as OrderStatus)}
            className={cn(
              "py-3 px-4 text-sm font-medium relative transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              activeTab === tab.id
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
            )}
          >
            {tab.label}
            <span className="ml-2 rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs">{tab.count}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
