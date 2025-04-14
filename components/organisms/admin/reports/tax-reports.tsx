"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { ReportFilterPanel } from "@/components/molecules/admin/reports/report-filter-panel"
import { useState } from "react"

export default function TaxReports() {
  const { showFilterPanel } = useSelector((state: RootState) => state.reports)
  const [activeTab, setActiveTab] = useState("jurisdiction")

  return (
    <div className="space-y-6">
      {showFilterPanel && <ReportFilterPanel />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="jurisdiction">By Jurisdiction</TabsTrigger>
          <TabsTrigger value="tax-class">By Tax Class</TabsTrigger>
          <TabsTrigger value="exemptions">Tax Exemptions</TabsTrigger>
          <TabsTrigger value="summary">Monthly/Quarterly Summary</TabsTrigger>
          <TabsTrigger value="liability">Tax Liability</TabsTrigger>
          <TabsTrigger value="records">Exportable Tax Records</TabsTrigger>
        </TabsList>

        <TabsContent value="jurisdiction">
          <Card>
            <CardHeader>
              <CardTitle>Tax Collected by Jurisdiction</CardTitle>
              <CardDescription>Breakdown of tax collected by geographic jurisdiction</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Tax by jurisdiction report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="tax-class">
          <Card>
            <CardHeader>
              <CardTitle>Tax by Tax Class</CardTitle>
              <CardDescription>Breakdown of tax collected by tax classification</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Tax by tax class report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exemptions">
          <Card>
            <CardHeader>
              <CardTitle>Tax Exemptions Summary</CardTitle>
              <CardDescription>Summary of tax-exempt sales and customers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Tax exemptions report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Monthly/Quarterly Tax Summary</CardTitle>
              <CardDescription>Periodic summary of tax collected for reporting periods</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Monthly/quarterly tax summary would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liability">
          <Card>
            <CardHeader>
              <CardTitle>Tax Liability Reports</CardTitle>
              <CardDescription>Current tax liability by jurisdiction</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Tax liability report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Exportable Tax Records</CardTitle>
              <CardDescription>Detailed tax records for filing purposes</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Exportable tax records would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
