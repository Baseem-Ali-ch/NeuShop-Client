"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { DateRange } from "react-day-picker"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface GeographicSalesProps {
  dateRange: DateRange
  compareMode: boolean
}

// Mock data for top regions
const topRegions = [
  { region: "United States", orders: 1245, revenue: 98760, percentage: 42 },
  { region: "United Kingdom", orders: 532, revenue: 42560, percentage: 18 },
  { region: "Canada", orders: 423, revenue: 33840, percentage: 14 },
  { region: "Australia", orders: 287, revenue: 22960, percentage: 10 },
  { region: "Germany", orders: 245, revenue: 19600, percentage: 8 },
  { region: "France", orders: 198, revenue: 15840, percentage: 6 },
  { region: "Other", orders: 56, revenue: 4480, percentage: 2 },
]

export default function GeographicSales({ dateRange, compareMode }: GeographicSalesProps) {
  const { loading } = useSelector((state: RootState) => state.ui)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Geographic Sales</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Sales Map</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              <div className="relative h-[400px] w-full rounded-md overflow-hidden">
                <img src="/world-sales-heatmap.png" alt="World Sales Map" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium">Sales Distribution</div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-xs">High</span>
                    </div>
                    <div className="flex items-center space-x-1 ml-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Medium</span>
                    </div>
                    <div className="flex items-center space-x-1 ml-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Low</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle>Top Regions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topRegions.map((region) => (
                      <TableRow key={region.region}>
                        <TableCell className="font-medium">{region.region}</TableCell>
                        <TableCell className="text-right">{region.orders}</TableCell>
                        <TableCell className="text-right">${region.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{region.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">International vs Domestic</div>
                  <div className="text-xs text-muted-foreground">Based on order count</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: "65%" }}></div>
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-medium">65%</span> International
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
