"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Edit, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks"
import { Sparkline } from "@/components/molecules/sparkline"

interface InventoryTableProps {
  isAdvancedView: boolean
  onStockAdjustment: (product: any) => void
}

export default function InventoryTable({ isAdvancedView, onStockAdjustment }: InventoryTableProps) {
  const { products } = useAppSelector((state) => state.inventory)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)

  const handleEditStart = (product: any) => {
    setEditingId(product.id)
    setEditValue(product.currentStock)
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  const handleEditSave = (product: any) => {
    // In a real app, dispatch an action to update the stock
    console.log(`Updated stock for ${product.name} to ${editValue}`)
    setEditingId(null)
  }

  const getStockStatusBadge = (product: any) => {
    if (product.currentStock === 0) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Out of Stock
        </Badge>
      )
    } else if (product.currentStock <= product.minimumStock) {
      return (
        <Badge variant="warning" className="flex items-center gap-1 bg-amber-500">
          <AlertTriangle className="h-3 w-3" />
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="success" className="flex items-center gap-1 bg-green-500">
          <CheckCircle2 className="h-3 w-3" />
          In Stock
        </Badge>
      )
    }
  }

  return (
    <Card className="shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  SKU/Barcode
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              {isAdvancedView && (
                <>
                  <TableHead>Location</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Current Stock
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Min. Stock</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>30-Day Sales</TableHead>
                </>
              )}
              {!isAdvancedView && (
                <>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Current Stock
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                </>
              )}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-10 w-10 rounded-md overflow-hidden">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>

                {isAdvancedView && (
                  <>
                    <TableCell>{product.location}</TableCell>
                    <TableCell>
                      {editingId === product.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number.parseInt(e.target.value))}
                            className="w-20 h-8"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditSave(product)}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleEditCancel}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="cursor-pointer hover:underline" onClick={() => handleEditStart(product)}>
                          {product.currentStock}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{product.availableStock}</TableCell>
                    <TableCell>{product.reservedStock}</TableCell>
                    <TableCell>{product.minimumStock}</TableCell>
                    <TableCell>{product.reorderPoint}</TableCell>
                    <TableCell>{product.leadTime} days</TableCell>
                    <TableCell>
                      <Sparkline data={product.salesHistory} width={80} height={24} />
                    </TableCell>
                  </>
                )}

                {!isAdvancedView && (
                  <>
                    <TableCell>
                      {editingId === product.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number.parseInt(e.target.value))}
                            className="w-20 h-8"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditSave(product)}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleEditCancel}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="cursor-pointer hover:underline" onClick={() => handleEditStart(product)}>
                          {product.currentStock}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{getStockStatusBadge(product)}</TableCell>
                  </>
                )}

                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => onStockAdjustment(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onStockAdjustment(product)}>Adjust Stock</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>Move Location</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{products.length}</strong> products
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
