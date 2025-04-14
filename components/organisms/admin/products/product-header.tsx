"use client"

import { PlusCircle, Download, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProductHeaderProps {
  onAddProduct: () => void
  onBulkEdit: () => void
  selectedCount: number
  onClearSelection: () => void
}

export default function ProductHeader({
  onAddProduct,
  onBulkEdit,
  selectedCount,
  onClearSelection,
}: ProductHeaderProps) {
  return (
    <div className="glassmorphism mb-6 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog, inventory, and pricing</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {selectedCount > 0 && (
            <div className="flex items-center mr-2">
              <span className="text-sm font-medium mr-2">{selectedCount} selected</span>
              <Button variant="outline" size="sm" onClick={onClearSelection} className="h-8">
                Clear
              </Button>
            </div>
          )}

          <Button
            onClick={onAddProduct}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Bulk Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glassmorphism-dropdown">
              <DropdownMenuItem onClick={onBulkEdit} disabled={selectedCount === 0}>
                <span className="mr-2">✏️</span> Edit Selected
              </DropdownMenuItem>
              <DropdownMenuItem disabled={selectedCount === 0}>
                <Download className="mr-2 h-4 w-4" /> Export Selected
              </DropdownMenuItem>
              <DropdownMenuItem disabled={selectedCount === 0} className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
