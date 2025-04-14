"use client"

import { useState } from "react"
import { useAppSelector } from "@/store/hooks"
import OrderHeader from "@/components/organisms/admin/orders/order-header"
import StatusTabs from "@/components/organisms/admin/orders/status-tabs"
import AdvancedFilters from "@/components/organisms/admin/orders/advanced-filters"
import OrderTable from "@/components/organisms/admin/orders/order-table"
import BulkActionsBar from "@/components/organisms/admin/orders/bulk-actions-bar"
import OrderDetails from "@/components/organisms/admin/orders/order-details"
import { selectSelectedOrders } from "@/store/slices/orderSlice"

export default function OrderManagement() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null)
  const selectedOrders = useAppSelector(selectSelectedOrders)

  const toggleFilters = () => setIsFilterOpen(!isFilterOpen)

  const openOrderDetails = (orderId: string) => {
    setCurrentOrderId(orderId)
    setIsDetailsOpen(true)
  }

  const closeOrderDetails = () => {
    setIsDetailsOpen(false)
    setCurrentOrderId(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <OrderHeader toggleFilters={toggleFilters} isFilterOpen={isFilterOpen} />

        <div className="mt-6">
          <StatusTabs />
        </div>

        {isFilterOpen && (
          <div className="mt-4">
            <AdvancedFilters />
          </div>
        )}

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <OrderTable onViewOrder={openOrderDetails} />
        </div>

        {selectedOrders.length > 0 && <BulkActionsBar />}
      </div>

      <OrderDetails isOpen={isDetailsOpen} onClose={closeOrderDetails} orderId={currentOrderId} />
    </div>
  )
}
