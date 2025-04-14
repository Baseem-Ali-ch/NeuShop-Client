"use client"

import { useState } from "react"
import AnalyticsHeader from "@/components/organisms/admin/analytics/analytics-header"
import PerformanceOverview from "@/components/organisms/admin/analytics/performance-overview"
import RevenueAnalytics from "@/components/organisms/admin/analytics/revenue-analytics"
import SalesPerformance from "@/components/organisms/admin/analytics/sales-performance"
import CustomerInsights from "@/components/organisms/admin/analytics/customer-insights"
import GeographicSales from "@/components/organisms/admin/analytics/geographic-sales"
import MarketingPerformance from "@/components/organisms/admin/analytics/marketing-performance"
import InventoryInsights from "@/components/organisms/admin/analytics/inventory-insights"
import CustomReportBuilder from "@/components/organisms/admin/analytics/custom-report-builder"

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
    preset?: string
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
    preset: "last30Days",
  })

  const [compareMode, setCompareMode] = useState(true)

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        compareMode={compareMode}
        setCompareMode={setCompareMode}
      />

      <PerformanceOverview dateRange={dateRange} compareMode={compareMode} />

      <RevenueAnalytics dateRange={dateRange} compareMode={compareMode} />

      <SalesPerformance dateRange={dateRange} compareMode={compareMode} />

      <CustomerInsights dateRange={dateRange} compareMode={compareMode} />

      <GeographicSales dateRange={dateRange} compareMode={compareMode} />

      <MarketingPerformance dateRange={dateRange} compareMode={compareMode} />

      <InventoryInsights dateRange={dateRange} compareMode={compareMode} />

      <CustomReportBuilder />
    </div>
  )
}
