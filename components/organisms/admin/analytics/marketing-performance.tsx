"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { DateRange } from "react-day-picker"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface MarketingPerformanceProps {
  dateRange: DateRange
  compareMode: boolean
}

// Mock data for campaign ROI
const campaignData = [
  { name: "Summer Sale", roi: 320, color: "#4f46e5" },
  { name: "Back to School", roi: 280, color: "#0ea5e9" },
  { name: "Holiday Special", roi: 420, color: "#8b5cf6" },
  { name: "Flash Sale", roi: 380, color: "#ec4899" },
  { name: "New Collection", roi: 250, color: "#f59e0b" },
]

// Mock data for traffic sources
const trafficData = [
  { name: "Organic Search", value: 35, color: "#4f46e5" },
  { name: "Direct", value: 25, color: "#0ea5e9" },
  { name: "Social Media", value: 20, color: "#8b5cf6" },
  { name: "Referral", value: 12, color: "#ec4899" },
  { name: "Email", value: 8, color: "#f59e0b" },
]

// Mock data for conversion rates
const conversionData = [
  { name: "Organic Search", rate: 3.2, color: "#4f46e5" },
  { name: "Direct", rate: 4.5, color: "#0ea5e9" },
  { name: "Social Media", rate: 2.8, color: "#8b5cf6" },
  { name: "Referral", rate: 5.1, color: "#ec4899" },
  { name: "Email", rate: 6.7, color: "#f59e0b" },
]

export default function MarketingPerformance({ dateRange, compareMode }: MarketingPerformanceProps) {
  const { loading } = useSelector((state: RootState) => state.ui)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Marketing Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Campaign ROI</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [`${value}%`, "ROI"]} />
                  <Bar dataKey="roi" radius={[4, 4, 0, 0]}>
                    {campaignData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {trafficData.map((source) => (
                <div key={source.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                  <span className="text-sm">{source.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Conversion Rate by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, "dataMax + 1"]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Conversion Rate"]} />
                  <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                    {conversionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
