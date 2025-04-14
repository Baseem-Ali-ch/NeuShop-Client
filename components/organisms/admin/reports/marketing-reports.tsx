"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { ReportFilterPanel } from "@/components/molecules/admin/reports/report-filter-panel"
import { useState } from "react"

export default function MarketingReports() {
  const { showFilterPanel } = useSelector((state: RootState) => state.reports)
  const [activeTab, setActiveTab] = useState("promotions")

  return (
    <div className="space-y-6">
      {showFilterPanel && <ReportFilterPanel />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="promotions">Promotion Effectiveness</TabsTrigger>
          <TabsTrigger value="discounts">Discount Usage</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign ROI</TabsTrigger>
          <TabsTrigger value="email">Email Performance</TabsTrigger>
          <TabsTrigger value="referrals">Referral Sources</TabsTrigger>
          <TabsTrigger value="abandoned">Abandoned Carts</TabsTrigger>
          <TabsTrigger value="search">Search Keywords</TabsTrigger>
          <TabsTrigger value="social">Social Media Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Effectiveness</CardTitle>
              <CardDescription>Analysis of promotion performance and impact on sales</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Promotion effectiveness report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="discounts">
          <Card>
            <CardHeader>
              <CardTitle>Discount Usage and Impact</CardTitle>
              <CardDescription>Analysis of discount usage and impact on revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Discount usage report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign ROI Comparison</CardTitle>
              <CardDescription>Return on investment comparison across marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Campaign ROI report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Marketing Performance</CardTitle>
              <CardDescription>Performance metrics for email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Email marketing performance report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Referral Source Analysis</CardTitle>
              <CardDescription>Analysis of traffic and conversion by referral source</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Referral source analysis would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abandoned">
          <Card>
            <CardHeader>
              <CardTitle>Abandoned Cart Analytics</CardTitle>
              <CardDescription>Analysis of abandoned carts and recovery efforts</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Abandoned cart analytics would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Keyword Performance</CardTitle>
              <CardDescription>Performance analysis of search keywords</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Search keyword performance report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Conversion Tracking</CardTitle>
              <CardDescription>Conversion tracking from social media channels</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Social media conversion report would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
