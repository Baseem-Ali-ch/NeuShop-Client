"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Percent, DollarSign, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { setSelectedProducts } from "@/store/slices/productSlice"

interface BulkEditPanelProps {
  isOpen: boolean
  onClose: () => void
  selectedCount: number
}

// Mock categories for the demo
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Beauty & Personal Care" },
  { id: 5, name: "Sports & Outdoors" },
]

export default function BulkEditPanel({ isOpen, onClose, selectedCount }: BulkEditPanelProps) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    categoryId: "",
    priceAdjustment: {
      type: "fixed", // fixed or percentage
      operation: "increase", // increase or decrease
      value: "",
    },
    inventoryAdjustment: {
      type: "set", // set or adjust
      value: "",
    },
    status: "",
  })

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePriceTypeChange = (value: string) => {
    setFormData({
      ...formData,
      priceAdjustment: {
        ...formData.priceAdjustment,
        type: value,
      },
    })
  }

  const handlePriceOperationChange = (value: string) => {
    setFormData({
      ...formData,
      priceAdjustment: {
        ...formData.priceAdjustment,
        operation: value,
      },
    })
  }

  const handlePriceValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      priceAdjustment: {
        ...formData.priceAdjustment,
        value: e.target.value,
      },
    })
  }

  const handleInventoryTypeChange = (value: string) => {
    setFormData({
      ...formData,
      inventoryAdjustment: {
        ...formData.inventoryAdjustment,
        type: value,
      },
    })
  }

  const handleInventoryValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      inventoryAdjustment: {
        ...formData.inventoryAdjustment,
        value: e.target.value,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would apply the bulk edits to the selected products
    console.log("Bulk edit submitted:", formData)
    dispatch(setSelectedProducts([]))
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md glassmorphism-modal overflow-y-auto">
        <SheetHeader className="space-y-2 pr-10">
          <SheetTitle>Bulk Edit Products</SheetTitle>
          <SheetDescription>Apply changes to {selectedCount} selected products.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange("categoryId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="No change" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-change">No change</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label>Price Adjustment</Label>
              <RadioGroup
                value={formData.priceAdjustment.type}
                onValueChange={handlePriceTypeChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="price-fixed" />
                  <Label htmlFor="price-fixed">Fixed amount</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="price-percentage" />
                  <Label htmlFor="price-percentage">Percentage</Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <Select value={formData.priceAdjustment.operation} onValueChange={handlePriceOperationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">Increase</SelectItem>
                    <SelectItem value="decrease">Decrease</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  {formData.priceAdjustment.type === "fixed" ? (
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  )}
                  <Input
                    type="number"
                    min="0"
                    step={formData.priceAdjustment.type === "fixed" ? "0.01" : "1"}
                    value={formData.priceAdjustment.value}
                    onChange={handlePriceValueChange}
                    placeholder={formData.priceAdjustment.type === "fixed" ? "0.00" : "0"}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label>Inventory Adjustment</Label>
              <RadioGroup
                value={formData.inventoryAdjustment.type}
                onValueChange={handleInventoryTypeChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="set" id="inventory-set" />
                  <Label htmlFor="inventory-set">Set to specific value</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adjust" id="inventory-adjust" />
                  <Label htmlFor="inventory-adjust">Adjust by amount</Label>
                </div>
              </RadioGroup>

              <div className="relative mt-2">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min={formData.inventoryAdjustment.type === "set" ? "0" : undefined}
                  value={formData.inventoryAdjustment.value}
                  onChange={handleInventoryValueChange}
                  placeholder={formData.inventoryAdjustment.type === "set" ? "New quantity" : "Adjustment amount"}
                  className="pl-10"
                />
              </div>
              {formData.inventoryAdjustment.type === "adjust" && (
                <p className="text-xs text-muted-foreground">
                  Use positive numbers to increase inventory, negative to decrease.
                </p>
              )}
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="No change" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-change">No change</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Apply to {selectedCount} Products</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
