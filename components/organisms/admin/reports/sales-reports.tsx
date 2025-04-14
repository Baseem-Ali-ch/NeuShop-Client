"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DataTable } from "@/components/molecules/admin/reports/data-table"
import { ReportFilterPanel } from "@/components/molecules/admin/reports/report-filter-panel"

// Mock data for sales reports
const salesData = [
  { date: "Jan 1", grossSales: 12500, netSales: 10625, orders: 125 },
  { date: "Jan 2", grossSales: 13200, netSales: 11220, orders: 132 },
  { date: "Jan 3", grossSales: 14100, netSales: 11985, orders: 141 },
  { date: "Jan 4", grossSales: 15000, netSales: 12750, orders: 150 },
  { date: "Jan 5", grossSales: 16200, netSales: 13770, orders: 162 },
  { date: "Jan 6", grossSales: 17500, netSales: 14875, orders: 175 },
  { date: "Jan 7", grossSales: 18800, netSales: 15980, orders: 188 },
  { date: "Jan 8", grossSales: 19200, netSales: 16320, orders: 192 },
  { date: "Jan 9", grossSales: 20100, netSales: 17085, orders: 201 },
  { date: "Jan 10", grossSales: 21000, netSales: 17850, orders: 210 },
  { date: "Jan 11", grossSales: 22200, netSales: 18870, orders: 222 },
  { date: "Jan 12", grossSales: 23500, netSales: 19975, orders: 235 },
  { date: "Jan 13", grossSales: 24800, netSales: 21080, orders: 248 },
  { date: "Jan 14", grossSales: 25200, netSales: 21420, orders: 252 },
]

const paymentMethodData = [
  { name: "Credit Card", value: 65, color: "#4f46e5" },
  { name: "PayPal", value: 20, color: "#0ea5e9" },
  { name: "Apple Pay", value: 10, color: "#8b5cf6" },
  { name: "Bank Transfer", value: 5, color: "#ec4899" },
]

const locationData = [
  { name: "United States", value: 45, color: "#4f46e5" },
  { name: "United Kingdom", value: 15, color: "#0ea5e9" },
  { name: "Canada", value: 12, color: "#8b5cf6" },
  { name: "Australia", value: 8, color: "#ec4899" },
  { name: "Germany", value: 7, color: "#f59e0b" },
  { name: "France", value: 5, color: "#10b981" },
  { name: "Other", value: 8, color: "#6b7280" },
]

const deviceData = [
  { name: "Desktop", value: 55, color: "#4f46e5" },
  { name: "Mobile", value: 35, color: "#0ea5e9" },
  { name: "Tablet", value: 10, color: "#8b5cf6" },
]

const customerTypeData = [
  { name: "New Customers", value: 35, color: "#4f46e5" },
  { name: "Returning Customers", value: 65, color: "#0ea5e9" },
]

const columns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "grossSales",
    header: "Gross Sales",
    cell: ({ row }) => {
      return `$${row.getValue("grossSales").toLocaleString()}`
    },
  },
  {
    accessorKey: "netSales",
    header: "Net Sales",
    cell: ({ row }) => {
      return `$${row.getValue("netSales").toLocaleString()}`
    },
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
]

export default function SalesReports() {
  const { viewMode, showFilterPanel, compareMode } = useSelector((state: RootState) => state.reports)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {showFilterPanel && <ReportFilterPanel />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-time">By Time Period</TabsTrigger>
          <TabsTrigger value="by-payment">By Payment Method</TabsTrigger>
          <TabsTrigger value="by-coupon">By Coupon Code</TabsTrigger>
          <TabsTrigger value="by-tax">By Tax Class</TabsTrigger>
          <TabsTrigger value="by-location">By Location</TabsTrigger>
          <TabsTrigger value="by-device">By Device Type</TabsTrigger>
          <TabsTrigger value="by-customer">By Customer Type</TabsTrigger>
          <TabsTrigger value="forecast">Sales Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gross Sales vs Net Sales</CardTitle>
              <CardDescription>Comparison of gross and net sales over the selected time period</CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "chart" ? (
                <ChartContainer
                  config={{
                    grossSales: {
                      label: "Gross Sales",
                      color: "hsl(var(--chart-1))",
                    },
                    netSales: {
                      label: "Net Sales",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGrossSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-grossSales)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-grossSales)" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorNetSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-netSales)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-netSales)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="grossSales"
                        stroke="var(--color-grossSales)"
                        fillOpacity={1}
                        fill="url(#colorGrossSales)"
                      />
                      <Area
                        type="monotone"
                        dataKey="netSales"
                        stroke="var(--color-netSales)"
                        fillOpacity={1}
                        fill="url(#colorNetSales)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <DataTable columns={columns} data={salesData} />
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                {viewMode === "chart" ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="space-y-2">
                    {paymentMethodData.map((method) => (
                      <div key={method.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: method.color }} />
                          <span>{method.name}</span>
                        </div>
                        <span>{method.value}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Location</CardTitle>
              </CardHeader>
              <CardContent>
                {viewMode === "chart" ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={locationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, "dataMax"]} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="space-y-2">
                    {locationData.map((location) => (
                      <div key={location.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: location.color }} />
                          <span>{location.name}</span>
                        </div>
                        <span>{location.value}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Customer Type</CardTitle>
              </CardHeader>
              <CardContent>
                {viewMode === "chart" ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={customerTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {customerTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="space-y-2">
                    {customerTypeData.map((type) => (
                      <div key={type.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }} />
                          <span>{type.name}</span>
                        </div>
                        <span>{type.value}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="by-time">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Time Period</CardTitle>
              <CardDescription>Analyze sales performance across different time intervals</CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "chart" ? (
                <ChartContainer
                  config={{
                    grossSales: {
                      label: "Gross Sales",
                      color: "hsl(var(--chart-1))",
                    },
                    orders: {
                      label: "Orders",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="grossSales"
                        stroke="var(--color-grossSales)"
                        activeDot={{ r: 8 }}
                      />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <DataTable columns={columns} data={salesData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="by-payment">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Payment Method</CardTitle>
              <CardDescription>Detailed breakdown of sales by payment method</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed payment method report content would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-coupon">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Coupon Code</CardTitle>
              <CardDescription>Analysis of coupon usage and impact on sales</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed coupon code report content would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-tax">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Tax Class</CardTitle>
              <CardDescription>Breakdown of sales by tax classification</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed tax class report content would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-location">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Location</CardTitle>
              <CardDescription>Geographic distribution of sales</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed location report content would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-device">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Device Type</CardTitle>
              <CardDescription>Analysis of sales by customer device type</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed device type report content would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-customer">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Customer Type</CardTitle>
              <CardDescription>Comparison of new vs returning customer sales</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed customer type report content would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>Projected sales based on historical data and trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Sales forecast projection would appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
