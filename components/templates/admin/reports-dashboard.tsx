"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import ReportsHeader from "@/components/organisms/admin/reports/reports-header"
import ReportsSidebar from "@/components/organisms/admin/reports/reports-sidebar"
import ReportCustomizationBar from "@/components/organisms/admin/reports/report-customization-bar"
import SalesReports from "@/components/organisms/admin/reports/sales-reports"
import ProductReports from "@/components/organisms/admin/reports/product-reports"
import CustomerReports from "@/components/organisms/admin/reports/customer-reports"
import InventoryReports from "@/components/organisms/admin/reports/inventory-reports"
import TaxReports from "@/components/organisms/admin/reports/tax-reports"
import MarketingReports from "@/components/organisms/admin/reports/marketing-reports"
import CustomReports from "@/components/organisms/admin/reports/custom-reports"
import SavedReports from "@/components/organisms/admin/reports/saved-reports"
import ExportConfigModal from "@/components/organisms/admin/reports/export-config-modal"
import { Card } from "@/components/ui/card"

export default function ReportsDashboard() {
  const dispatch = useDispatch()
  const { activeReportCategory, isLoading, error } = useSelector((state: RootState) => state.reports)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would fetch the report data based on the active category
    // and date range from the Redux store
  }, [activeReportCategory])

  const handleRefreshData = () => {
    // In a real app, this would trigger a refresh of the current report data
    setLastUpdated(new Date())
  }

  const handleExportClick = () => {
    setIsExportModalOpen(true)
  }

  const renderActiveReport = () => {
    switch (activeReportCategory) {
      case "sales":
        return <SalesReports />
      case "products":
        return <ProductReports />
      case "customers":
        return <CustomerReports />
      case "inventory":
        return <InventoryReports />
      case "tax":
        return <TaxReports />
      case "marketing":
        return <MarketingReports />
      case "custom":
        return <CustomReports />
      case "saved":
        return <SavedReports />
      default:
        return <SalesReports />
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ReportsHeader onRefresh={handleRefreshData} lastUpdated={lastUpdated} />

      <div className="flex flex-1 overflow-hidden">
        <ReportsSidebar />

        <div className="flex-1 overflow-auto p-6">
          <ReportCustomizationBar onExport={handleExportClick} />

          {isLoading ? (
            <Card className="p-8">
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading report data...</p>
              </div>
            </Card>
          ) : error ? (
            <Card className="p-8">
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
                <p className="text-muted-foreground">{error}</p>
                <button
                  onClick={handleRefreshData}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Try Again
                </button>
              </div>
            </Card>
          ) : (
            renderActiveReport()
          )}
        </div>
      </div>

      <ExportConfigModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  )
}
