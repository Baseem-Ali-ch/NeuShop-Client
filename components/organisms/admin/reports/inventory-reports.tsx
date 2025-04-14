"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { ReportFilterPanel } from "@/components/molecules/admin/reports/report-filter-panel"
import { useState } from "react"

export default function InventoryReports() {
  const { showFilterPanel } = useSelector((state: RootState) => state.reports)
  const [activeTab, setActiveTab] = useState("summary")

  return (
    <div className="space-y-6">
      {showFilterPanel && <ReportFilterPanel />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="summary">Stock Level Summary</TabsTrigger>
          <TabsTrigger value="valuation">Inventory Valuation</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock Alerts</TabsTrigger>
          <TabsTrigger value="turnover">Inventory Turnover</TabsTrigger>
          <TabsTrigger value="days-supply">Days of Supply</TabsTrigger>
          <TabsTrigger value="slow-moving">Slow-Moving Inventory</TabsTrigger>
          <TabsTrigger value="adjustments">Stock Adjustment History</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Stock Level Summary</CardTitle>
              <CardDescription>Overview of current inventory stock levels</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Stock level summary report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="valuation">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Valuation</CardTitle>
              <CardDescription>Current value of inventory by product and category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Inventory valuation report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription>Products with stock levels below threshold</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Low stock alerts report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnover">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Turnover Rate</CardTitle>
              <CardDescription>Analysis of inventory turnover by product and category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Inventory turnover report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="days-supply">
          <Card>
            <CardHeader>
              <CardTitle>Days of Supply Remaining</CardTitle>
              <CardDescription>Estimated days of supply based on sales velocity</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Days of supply report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="slow-moving">
          <Card>
            <CardHeader>
              <CardTitle>Slow-Moving Inventory</CardTitle>
              <CardDescription>Products with low sales velocity</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Slow-moving inventory report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjustments">
          <Card>
            <CardHeader>
              <CardTitle>Stock Adjustment History</CardTitle>
              <CardDescription>History of inventory adjustments and reasons</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Stock adjustment history report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Inventory Trends</CardTitle>
              <CardDescription>Analysis of seasonal patterns in inventory levels</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Seasonal inventory trends report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
