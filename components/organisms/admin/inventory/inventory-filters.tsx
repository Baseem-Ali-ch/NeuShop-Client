"use client"

import { useState } from "react"
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/molecules/date-picker-with-range"
import { Badge } from "@/components/ui/badge"

export default function InventoryFilters() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Inventory Filters
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters.length}
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="flex items-center gap-1">
                {filter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter(filter)} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </CardHeader>

      {!isCollapsed && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Stock Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Status</label>
              <Select onValueChange={(value) => toggleFilter(`Status: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="overstock">Overstock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select onValueChange={(value) => toggleFilter(`Category: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home-goods">Home Goods</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select onValueChange={(value) => toggleFilter(`Brand: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="nike">Nike</SelectItem>
                  <SelectItem value="adidas">Adidas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Supplier Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Supplier</label>
              <Select onValueChange={(value) => toggleFilter(`Supplier: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="supplier-a">Supplier A</SelectItem>
                  <SelectItem value="supplier-b">Supplier B</SelectItem>
                  <SelectItem value="supplier-c">Supplier C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Warehouse Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Warehouse</label>
              <Select onValueChange={(value) => toggleFilter(`Warehouse: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="east">East Coast</SelectItem>
                  <SelectItem value="west">West Coast</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Added/Updated</label>
              <DatePickerWithRange
                onChange={(range) => {
                  if (range?.from && range?.to) {
                    toggleFilter(`Date: ${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`)
                  }
                }}
              />
            </div>

            {/* Search by SKU/Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by name or SKU"
                onChange={(e) => {
                  if (e.target.value) {
                    toggleFilter(`Search: ${e.target.value}`)
                  }
                }}
              />
            </div>

            {/* Custom Attributes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Attributes</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" onCheckedChange={() => toggleFilter("Featured")} />
                  <label htmlFor="featured" className="text-sm">
                    Featured
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="discontinued" onCheckedChange={() => toggleFilter("Discontinued")} />
                  <label htmlFor="discontinued" className="text-sm">
                    Discontinued
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="backorder" onCheckedChange={() => toggleFilter("Backorder Allowed")} />
                  <label htmlFor="backorder" className="text-sm">
                    Backorder Allowed
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={clearFilters}>
              Reset
            </Button>
            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
