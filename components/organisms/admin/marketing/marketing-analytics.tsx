"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for analytics
const campaignPerformanceData = [
  { name: "Summer Sale", opens: 4200, clicks: 1800, conversions: 320 },
  { name: "New Arrivals", opens: 3800, clicks: 1500, conversions: 280 },
  { name: "Flash Sale", opens: 5100, clicks: 2200, conversions: 420 },
  { name: "Holiday Special", opens: 6200, clicks: 2800, conversions: 580 },
  { name: "Clearance", opens: 3200, clicks: 1200, conversions: 180 },
]

const channelPerformanceData = [
  { name: "Email", value: 45 },
  { name: "Social", value: 25 },
  { name: "Discount", value: 20 },
  { name: "Referral", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const revenueByPromotionData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
  { name: "Jul", revenue: 7000 },
  { name: "Aug", revenue: 6500 },
  { name: "Sep", revenue: 8000 },
  { name: "Oct", revenue: 7500 },
  { name: "Nov", revenue: 9000 },
  { name: "Dec", revenue: 11000 },
]

export default function MarketingAnalytics() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-bold">Marketing Analytics</CardTitle>
            <CardDescription>Performance metrics for your marketing campaigns</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="campaigns">
          <TabsList className="mb-4">
            <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
            <TabsTrigger value="channels">Channel Distribution</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Campaign Performance Chart</h3>
                <p className="text-gray-500">Bar chart showing opens, clicks, and conversions for each campaign</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Channel Distribution Chart</h3>
                <p className="text-gray-500">Pie chart showing distribution of marketing performance by channel</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Revenue Impact Chart</h3>
                <p className="text-gray-500">Line chart showing revenue generated from promotions over time</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
