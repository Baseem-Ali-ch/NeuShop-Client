"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data for low stock products
const lowStockProducts = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    stock: 5,
    threshold: 20,
    percentage: 25,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    stock: 8,
    threshold: 25,
    percentage: 32,
  },
  {
    id: 3,
    name: "Premium Leather Wallet",
    stock: 3,
    threshold: 15,
    percentage: 20,
  },
]

export default function LowStockAlerts() {
  return (
    <Card className="neumorphic-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <div>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Products that need restocking soon</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {product.stock} / {product.threshold}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={product.percentage} className="h-2" />
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Restock {product.name}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
