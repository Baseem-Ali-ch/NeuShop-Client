"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
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

interface CustomerInsightsProps {
  dateRange: DateRange
  compareMode: boolean
}

// Mock data for new vs returning customers
const customerTypeData = [
  { name: "New Customers", value: 65, color: "#4f46e5" },
  { name: "Returning Customers", value: 35, color: "#0ea5e9" },
]

// Mock data for customer acquisition channels
const acquisitionData = [
  { name: "Organic Search", value: 35, color: "#4f46e5" },
  { name: "Direct", value: 25, color: "#0ea5e9" },
  { name: "Social Media", value: 20, color: "#8b5cf6" },
  { name: "Referral", value: 12, color: "#ec4899" },
  { name: "Email", value: 8, color: "#f59e0b" },
]

// Mock data for customer lifetime value trend
const lifetimeValueData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 125 },
  { month: "Mar", value: 130 },
  { month: "Apr", value: 140 },
  { month: "May", value: 145 },
  { month: "Jun", value: 155 },
  { month: "Jul", value: 160 },
  { month: "Aug", value: 170 },
  { month: "Sep", value: 175 },
  { month: "Oct", value: 185 },
  { month: "Nov", value: 190 },
  { month: "Dec", value: 200 },
]

// Mock data for cohort retention
const cohortData = [
  { name: "Week 1", retention: 100 },
  { name: "Week 2", retention: 80 },
  { name: "Week 3", retention: 70 },
  { name: "Week 4", retention: 65 },
  { name: "Week 5", retention: 60 },
  { name: "Week 6", retention: 55 },
  { name: "Week 7", retention: 52 },
  { name: "Week 8", retention: 50 },
]

export default function CustomerInsights({ dateRange, compareMode }: CustomerInsightsProps) {
  const { loading } = useSelector((state: RootState) => state.ui)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Customer Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Customer Type</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {customerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-2 space-y-2">
              {customerTypeData.map((type) => (
                <div key={type.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                  <span className="text-sm">{type.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Acquisition Channels</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={acquisitionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, "dataMax"]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {acquisitionData.map((entry, index) => (
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
            <CardTitle>Lifetime Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lifetimeValueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
                  <Tooltip formatter={(value: number) => [`$${value}`, "Avg. LTV"]} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Cohort Retention</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[200px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Retention"]} />
                  <Bar dataKey="retention" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
