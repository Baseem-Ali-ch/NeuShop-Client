"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for top selling products
const topProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image: "/vibrant-headphones.png",
    unitsSold: 245,
    revenue: "$24,500",
    stock: 58,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    image: "/smartwatch-app-display.png",
    unitsSold: 187,
    revenue: "$18,700",
    stock: 32,
  },
  {
    id: 3,
    name: "Wireless Earbuds Pro",
    image: "/sleek-wireless-earbuds.png",
    unitsSold: 156,
    revenue: "$12,480",
    stock: 15,
  },
  {
    id: 4,
    name: "Portable Power Bank",
    image: "/sleek-power-on-the-go.png",
    unitsSold: 132,
    revenue: "$6,600",
    stock: 42,
  },
]

export default function TopSellingProducts() {
  const getStockStatusColor = (stock: number) => {
    if (stock > 50) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    if (stock > 20) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  }

  const getStockStatus = (stock: number) => {
    if (stock > 50) return "In Stock"
    if (stock > 20) return "Low Stock"
    return "Critical"
  }

  return (
    <Card className="neumorphic-card">
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Your best performing products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 rounded-lg border border-border p-3 transition-all hover:bg-muted/50"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-md border border-border">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{product.name}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{product.unitsSold} units</span>
                  <span className="mx-2">•</span>
                  <span>{product.revenue}</span>
                </div>
              </div>
              <div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    getStockStatusColor(product.stock),
                  )}
                >
                  {getStockStatus(product.stock)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
