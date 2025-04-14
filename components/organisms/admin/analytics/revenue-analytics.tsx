"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { DateRange } from "react-day-picker"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface RevenueAnalyticsProps {
  dateRange: DateRange
  compareMode: boolean
}

// Mock data for the revenue chart
const revenueData = [
  { date: "Jan 1", revenue: 1200, prevRevenue: 1000, products: 900, shipping: 200, tax: 100 },
  { date: "Jan 2", revenue: 1300, prevRevenue: 1100, products: 950, shipping: 250, tax: 100 },
  { date: "Jan 3", revenue: 1400, prevRevenue: 1200, products: 1000, shipping: 300, tax: 100 },
  { date: "Jan 4", revenue: 1500, prevRevenue: 1300, products: 1100, shipping: 300, tax: 100 },
  { date: "Jan 5", revenue: 1600, prevRevenue: 1400, products: 1200, shipping: 300, tax: 100 },
  { date: "Jan 6", revenue: 1700, prevRevenue: 1500, products: 1300, shipping: 300, tax: 100 },
  { date: "Jan 7", revenue: 1800, prevRevenue: 1600, products: 1400, shipping: 300, tax: 100 },
  { date: "Jan 8", revenue: 1900, prevRevenue: 1700, products: 1500, shipping: 300, tax: 100 },
  { date: "Jan 9", revenue: 2000, prevRevenue: 1800, products: 1600, shipping: 300, tax: 100 },
  { date: "Jan 10", revenue: 2100, prevRevenue: 1900, products: 1700, shipping: 300, tax: 100 },
  { date: "Jan 11", revenue: 2200, prevRevenue: 2000, products: 1800, shipping: 300, tax: 100 },
  { date: "Jan 12", revenue: 2300, prevRevenue: 2100, products: 1900, shipping: 300, tax: 100 },
  { date: "Jan 13", revenue: 2400, prevRevenue: 2200, products: 2000, shipping: 300, tax: 100 },
  { date: "Jan 14", revenue: 2500, prevRevenue: 2300, products: 2100, shipping: 300, tax: 100 },
]

// Mock data for the channel distribution
const channelData = [
  { name: "Online Store", value: 65, color: "#4f46e5" },
  { name: "Marketplace", value: 20, color: "#0ea5e9" },
  { name: "Social", value: 10, color: "#8b5cf6" },
  { name: "POS", value: 5, color: "#ec4899" },
]

export default function RevenueAnalytics({ dateRange, compareMode }: RevenueAnalyticsProps) {
  const [timeView, setTimeView] = useState("daily")
  const { loading } = useSelector((state: RootState) => state.ui)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-[#4f46e5]">Revenue: ${payload[0].value.toLocaleString()}</p>
          {compareMode && <p className="text-[#94a3b8]">Previous: ${payload[1]?.value.toLocaleString()}</p>}
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm">Breakdown:</p>
            <p className="text-sm">Products: ${payload[0].payload.products.toLocaleString()}</p>
            <p className="text-sm">Shipping: ${payload[0].payload.shipping.toLocaleString()}</p>
            <p className="text-sm">Tax: ${payload[0].payload.tax.toLocaleString()}</p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Revenue Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-white shadow-sm border border-gray-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Over Time</CardTitle>
              <Tabs defaultValue="daily" className="w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily" onClick={() => setTimeView("daily")}>
                    Daily
                  </TabsTrigger>
                  <TabsTrigger value="weekly" onClick={() => setTimeView("weekly")}>
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" onClick={() => setTimeView("monthly")}>
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorPrevRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRevenue)" />
                  {compareMode && (
                    <Area
                      type="monotone"
                      dataKey="prevRevenue"
                      stroke="#94a3b8"
                      fillOpacity={1}
                      fill="url(#colorPrevRevenue)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            )}
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <div>Showing data for {timeView} view</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#4f46e5] mr-2"></div>
                  <span>Current period</span>
                </div>
                {compareMode && (
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#94a3b8] mr-2"></div>
                    <span>Previous period</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Revenue by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {channelData.map((channel) => (
                <div key={channel.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: channel.color }}></div>
                  <span className="text-sm">{channel.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
