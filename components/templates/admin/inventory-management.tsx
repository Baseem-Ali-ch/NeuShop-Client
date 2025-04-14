"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setView } from "@/store/slices/uiSlice"
import InventoryHeader from "@/components/organisms/admin/inventory/inventory-header"
import InventoryOverview from "@/components/organisms/admin/inventory/inventory-overview"
import InventoryAlerts from "@/components/organisms/admin/inventory/inventory-alerts"
import InventoryFilters from "@/components/organisms/admin/inventory/inventory-filters"
import InventoryTable from "@/components/organisms/admin/inventory/inventory-table"
import StockAdjustmentModal from "@/components/organisms/admin/inventory/stock-adjustment-modal"
import BulkUpdateModal from "@/components/organisms/admin/inventory/bulk-update-modal"
import InventoryHistoryLog from "@/components/organisms/admin/inventory/inventory-history-log"

export default function InventoryManagement() {
  const dispatch = useAppDispatch()
  const view = useAppSelector((state) => state.ui.inventoryView)
  const [showStockModal, setShowStockModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [showHistoryLog, setShowHistoryLog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleViewChange = (newView: "simple" | "advanced") => {
    dispatch(setView(newView))
  }

  const handleStockAdjustment = (productId: string) => {
    setSelectedProduct(productId)
    setShowStockModal(true)
  }

  const handleBulkUpdate = (productIds: string[]) => {
    setSelectedProducts(productIds)
    setShowBulkModal(true)
  }

  const handleViewHistory = () => {
    setShowHistoryLog(true)
  }

  return (
    <div className="space-y-6 p-6">
      <InventoryHeader onViewHistory={handleViewHistory} currentView={view} onViewChange={handleViewChange} />

      <InventoryOverview />

      <InventoryAlerts />

      <InventoryFilters />

      <InventoryTable onStockAdjustment={handleStockAdjustment} onBulkUpdate={handleBulkUpdate} />

      {showStockModal && (
        <StockAdjustmentModal
          productId={selectedProduct}
          isOpen={showStockModal}
          onClose={() => setShowStockModal(false)}
        />
      )}

      {showBulkModal && (
        <BulkUpdateModal productIds={selectedProducts} isOpen={showBulkModal} onClose={() => setShowBulkModal(false)} />
      )}

      {showHistoryLog && <InventoryHistoryLog isOpen={showHistoryLog} onClose={() => setShowHistoryLog(false)} />}
    </div>
  )
}
