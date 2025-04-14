"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { ReportFilterPanel } from "@/components/molecules/admin/reports/report-filter-panel"
import { useState } from "react"

export default function CustomerReports() {
  const { showFilterPanel } = useSelector((state: RootState) => state.reports)
  const [activeTab, setActiveTab] = useState("acquisition")

  return (
    <div className="space-y-6">
      {showFilterPanel && <ReportFilterPanel />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="acquisition">Customer Acquisition</TabsTrigger>
          <TabsTrigger value="lifetime-value">Lifetime Value</TabsTrigger>
          <TabsTrigger value="repeat-purchase">Repeat Purchase Rate</TabsTrigger>
          <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Distribution</TabsTrigger>
          <TabsTrigger value="devices">Device Usage</TabsTrigger>
          <TabsTrigger value="registration">Registration Source</TabsTrigger>
        </TabsList>

        <TabsContent value="acquisition">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>Analysis of new customer acquisition over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Customer acquisition report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="lifetime-value">
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value</CardTitle>
              <CardDescription>Analysis of customer lifetime value metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Customer lifetime value report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repeat-purchase">
          <Card>
            <CardHeader>
              <CardTitle>Repeat Purchase Rate</CardTitle>
              <CardDescription>Analysis of customer repeat purchase behavior</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Repeat purchase rate report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohort">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Analysis</CardTitle>
              <CardDescription>Customer retention and behavior by cohort groups</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Cohort analysis report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments Comparison</CardTitle>
              <CardDescription>Performance comparison across customer segments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Customer segments report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Customer distribution by geographic location</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Geographic distribution report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device/Browser Usage</CardTitle>
              <CardDescription>Analysis of customer device and browser preferences</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Device usage report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration">
          <Card>
            <CardHeader>
              <CardTitle>Registration Source Analytics</CardTitle>
              <CardDescription>Analysis of customer registration sources</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Registration source report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
