"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DateRange } from "react-day-picker"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface InventoryInsightsProps {
  dateRange: DateRange
  compareMode: boolean
}

// Mock data for stock turn rate
const stockTurnData = [
  { category: "Electronics", rate: 5.2, color: "#4f46e5" },
  { category: "Clothing", rate: 4.8, color: "#0ea5e9" },
  { category: "Home & Kitchen", rate: 3.5, color: "#8b5cf6" },
  { category: "Beauty", rate: 6.1, color: "#ec4899" },
  { category: "Sports", rate: 2.9, color: "#f59e0b" },
]

// Mock data for top performing products by margin
const topMarginProducts = [
  {
    id: 1,
    image: "/sleek-wireless-earbuds.png",
    name: "True Wireless Earbuds",
    margin: 65,
    revenue: 25740,
    stock: 124,
  },
  {
    id: 2,
    image: "/classic-plain-tee.png",
    name: "Premium Cotton T-Shirt",
    margin: 58,
    revenue: 5610,
    stock: 342,
  },
  {
    id: 3,
    image: "/modern-smartwatch-display.png",
    name: "Smart Watch Series 5",
    margin: 52,
    revenue: 39600,
    stock: 86,
  },
  {
    id: 4,
    image: "/sleek-power-on-the-go.png",
    name: "Portable Power Bank 20000mAh",
    margin: 48,
    revenue: 12650,
    stock: 215,
  },
  {
    id: 5,
    image: "/sleek-wireless-audio.png",
    name: "Wireless Noise-Cancelling Headphones",
    margin: 45,
    revenue: 47880,
    stock: 68,
  },
]

export default function InventoryInsights({ dateRange, compareMode }: InventoryInsightsProps) {
  const { loading } = useSelector((state: RootState) => state.ui)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Inventory Insights</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Stock Turn Rate by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockTurnData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, "dataMax + 1"]} />
                  <Tooltip formatter={(value: number) => [value.toFixed(1), "Turn Rate"]} />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {stockTurnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {stockTurnData.map((category) => (
                <div key={category.category} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm">
                    {category.category}: {category.rate.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Top Performing Products by Margin</CardTitle>
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
                      <TableHead className="text-right">Margin</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topMarginProducts.map((product) => (
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
                        <TableCell className="text-right">{product.margin}%</TableCell>
                        <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Inventory Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800">Low Stock Items</h3>
              <p className="text-sm text-red-600 mt-1">8 products below threshold</p>
              <div className="mt-3">
                <button className="text-sm text-red-800 font-medium hover:underline">View Details</button>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-medium text-amber-800">Slow-Moving Inventory</h3>
              <p className="text-sm text-amber-600 mt-1">12 products with low turnover</p>
              <div className="mt-3">
                <button className="text-sm text-amber-800 font-medium hover:underline">View Details</button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800">Restock Recommendations</h3>
              <p className="text-sm text-blue-600 mt-1">5 products need reordering</p>
              <div className="mt-3">
                <button className="text-sm text-blue-800 font-medium hover:underline">View Details</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
