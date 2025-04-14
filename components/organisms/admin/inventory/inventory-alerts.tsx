"use client"

import { useState } from "react"
import { AlertTriangle, AlertCircle, TrendingUp, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useAppSelector } from "@/store/hooks"

export default function InventoryAlerts() {
  const { products } = useAppSelector((state) => state.inventory)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [lowStockThreshold, setLowStockThreshold] = useState(10)
  const [hideDiscontinued, setHideDiscontinued] = useState(false)

  // Calculate critical alerts
  const criticalAlerts = products.filter((p) => p.currentStock === 0 && !p.isDiscontinued)

  // Calculate restock recommendations based on sales velocity
  const restockRecommendations = products.filter((p) => p.salesVelocity > 0.5 && p.currentStock <= p.reorderPoint)

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Inventory Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Low Stock Configuration */}
            <div className="space-y-4">
              <h3 className="font-medium">Low Stock Threshold</h3>
              <div className="flex items-center gap-4">
                <Slider
                  value={[lowStockThreshold]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(value) => setLowStockThreshold(value[0])}
                  className="flex-1"
                />
                <span className="w-8 text-center">{lowStockThreshold}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hide discontinued</span>
                <Switch checked={hideDiscontinued} onCheckedChange={setHideDiscontinued} />
              </div>
            </div>

            {/* Critical Stock Alerts */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Critical Stock Alerts ({criticalAlerts.length})
              </h3>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {criticalAlerts.length > 0 ? (
                  criticalAlerts.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center text-sm p-2 bg-red-50 dark:bg-red-950/30 rounded-md"
                    >
                      <span className="font-medium truncate">{product.name}</span>
                      <Button size="sm" variant="destructive" className="h-7 text-xs">
                        Restock
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No critical alerts</p>
                )}

                {criticalAlerts.length > 3 && (
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    View all {criticalAlerts.length} alerts
                  </Button>
                )}
              </div>
            </div>

            {/* Restock Recommendations */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Restock Recommendations ({restockRecommendations.length})
              </h3>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {restockRecommendations.length > 0 ? (
                  restockRecommendations.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center text-sm p-2 bg-green-50 dark:bg-green-950/30 rounded-md"
                    >
                      <div className="truncate">
                        <span className="font-medium">{product.name}</span>
                        <div className="text-xs text-muted-foreground">
                          Selling {product.salesVelocity.toFixed(1)}/day
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Order
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recommendations</p>
                )}

                {restockRecommendations.length > 3 && (
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    View all {restockRecommendations.length} recommendations
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
