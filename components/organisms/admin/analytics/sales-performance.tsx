"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowDownIcon, ArrowUpIcon, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface SalesPerformanceProps {
  dateRange: DateRange
  compareMode: boolean
}

// Mock data for top selling products
const topSellingProducts = [
  {
    id: 1,
    image: "/sleek-wireless-audio.png",
    name: "Wireless Noise-Cancelling Headphones",
    unitsSold: 342,
    revenue: 47880,
    margin: 32,
    trend: 12.5,
  },
  {
    id: 2,
    image: "/sleek-wireless-earbuds.png",
    name: "True Wireless Earbuds",
    unitsSold: 286,
    revenue: 25740,
    margin: 45,
    trend: 8.3,
  },
  {
    id: 3,
    image: "/sleek-power-on-the-go.png",
    name: "Portable Power Bank 20000mAh",
    unitsSold: 253,
    revenue: 12650,
    margin: 38,
    trend: -3.2,
  },
  {
    id: 4,
    image: "/modern-smartwatch-display.png",
    name: "Smart Watch Series 5",
    unitsSold: 198,
    revenue: 39600,
    margin: 42,
    trend: 15.7,
  },
  {
    id: 5,
    image: "/classic-plain-tee.png",
    name: "Premium Cotton T-Shirt",
    unitsSold: 187,
    revenue: 5610,
    margin: 52,
    trend: -1.8,
  },
]

// Mock data for top categories
const topCategories = [
  { name: "Electronics", value: 45, color: "#4f46e5", change: 5.2 },
  { name: "Clothing", value: 25, color: "#0ea5e9", change: -2.1 },
  { name: "Home & Kitchen", value: 15, color: '#8b5cf  value: 25, color: "#0ea5e9', change: -2.1 },
  { name: "Home & Kitchen", value: 15, color: "#8b5cf6", change: 3.7 },
  { name: "Beauty", value: 10, color: "#ec4899", change: 8.4 },
  { name: "Sports", value: 5, color: "#f59e0b", change: 1.2 },
]

export default function SalesPerformance({ dateRange, compareMode }: SalesPerformanceProps) {
  const { loading } = useSelector((state: RootState) => state.ui)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Sales Performance</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Units</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Margin</TableHead>
                      <TableHead className="text-right">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellingProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <span className="font-medium truncate max-w-[180px]">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{product.unitsSold}</TableCell>
                        <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{product.margin}%</TableCell>
                        <TableCell className="text-right">
                          <div
                            className={cn(
                              "flex items-center justify-end",
                              product.trend > 0 ? "text-green-600" : "text-red-600",
                            )}
                          >
                            {product.trend > 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(product.trend)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {topCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 space-y-2">
              {topCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div
                    className={cn("flex items-center text-sm", category.change > 0 ? "text-green-600" : "text-red-600")}
                  >
                    {category.change > 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(category.change)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
