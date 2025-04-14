"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { ReportFilterPanel } from "@/components/molecules/admin/reports/report-filter-panel"
import { useState } from "react"

export default function ProductReports() {
  const { showFilterPanel } = useSelector((state: RootState) => state.reports)
  const [activeTab, setActiveTab] = useState("best-selling")

  return (
    <div className="space-y-6">
      {showFilterPanel && <ReportFilterPanel />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="best-selling">Best Selling</TabsTrigger>
          <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
          <TabsTrigger value="categories">Category Performance</TabsTrigger>
          <TabsTrigger value="views-conversions">Views vs Conversions</TabsTrigger>
          <TabsTrigger value="cross-sell">Cross-Sell Performance</TabsTrigger>
          <TabsTrigger value="returns">Refund/Return Rates</TabsTrigger>
          <TabsTrigger value="reviews">Review Analysis</TabsTrigger>
          <TabsTrigger value="profit-margin">Profit Margin</TabsTrigger>
        </TabsList>

        <TabsContent value="best-selling">
          <Card>
            <CardHeader>
              <CardTitle>Best Selling Products</CardTitle>
              <CardDescription>Top performing products by sales volume and revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Best selling products report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Comparison</CardTitle>
              <CardDescription>Compare performance metrics across multiple products</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Product performance comparison would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Sales performance by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Category performance report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="views-conversions">
          <Card>
            <CardHeader>
              <CardTitle>Product Views vs Conversions</CardTitle>
              <CardDescription>Conversion rates from product views to purchases</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Views vs conversions report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cross-sell">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Sell Performance</CardTitle>
              <CardDescription>Effectiveness of product cross-selling strategies</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Cross-sell performance report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="returns">
          <Card>
            <CardHeader>
              <CardTitle>Refund/Return Rates</CardTitle>
              <CardDescription>Analysis of product returns and refunds</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Refund/return rates report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Product Review Analysis</CardTitle>
              <CardDescription>Analysis of customer reviews and ratings</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Product review analysis would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit-margin">
          <Card>
            <CardHeader>
              <CardTitle>Profit Margin by Product</CardTitle>
              <CardDescription>Analysis of profit margins across products</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Profit margin report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
