"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for the chart
const generateData = (days: number) => {
  const data = []
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: Math.floor(Math.random() * 5000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
    })
  }
  return data
}

export default function SalesPerformanceChart() {
  const [timeRange, setTimeRange] = useState("Weekly")
  const [data, setData] = useState(() => generateData(7))

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)

    switch (range) {
      case "Daily":
        setData(generateData(1))
        break
      case "Weekly":
        setData(generateData(7))
        break
      case "Monthly":
        setData(generateData(30))
        break
      case "Yearly":
        setData(generateData(365))
        break
      default:
        setData(generateData(7))
    }
  }

  return (
    <Card className="neumorphic-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Revenue and orders over time</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Date Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <label htmlFor="from" className="text-xs font-medium">
                        From
                      </label>
                      <input
                        id="from"
                        type="date"
                        className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label htmlFor="to" className="text-xs font-medium">
                        To
                      </label>
                      <input
                        id="to"
                        type="date"
                        className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <span>{timeRange}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleTimeRangeChange("Daily")}>Daily</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTimeRangeChange("Weekly")}>Weekly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTimeRangeChange("Monthly")}>Monthly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTimeRangeChange("Yearly")}>Yearly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e0e0e0",
                }}
                formatter={(value, name) => {
                  if (name === "revenue") return [`$${value}`, "Revenue"]
                  return [value, "Orders"]
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
