"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductFiltersProps {
  onSearch: (term: string) => void
  filters: any
  onFilterChange: (filters: any) => void
  onClearFilters: () => void
}

// Mock categories for the demo
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Beauty & Personal Care" },
  { id: 5, name: "Sports & Outdoors" },
]

export default function ProductFilters({ onSearch, filters, onFilterChange, onClearFilters }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters({
      ...localFilters,
      [key]: value,
    })
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    setIsAdvancedFiltersOpen(false)
  }

  const handleCategoryChange = (categoryId: number) => {
    const newCategories = localFilters.categories.includes(categoryId)
      ? localFilters.categories.filter((id: number) => id !== categoryId)
      : [...localFilters.categories, categoryId]

    handleFilterChange("categories", newCategories)
  }

  const handleStatusChange = (status: string) => {
    const newStatus = localFilters.status.includes(status)
      ? localFilters.status.filter((s: string) => s !== status)
      : [...localFilters.status, status]

    handleFilterChange("status", newStatus)
  }

  const isFiltersActive = () => {
    return (
      localFilters.categories.length > 0 ||
      localFilters.status.length > 0 ||
      localFilters.priceRange[0] > 0 ||
      localFilters.priceRange[1] < 1000 ||
      localFilters.dateRange[0] !== null ||
      localFilters.dateRange[1] !== null
    )
  }

  return (
    <div className="glassmorphism mb-6 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products by name, SKU, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-background/50 border-border"
            />
          </div>
        </form>

        <div className="flex gap-2">
          <Popover open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
                {isFiltersActive() && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {localFilters.categories.length +
                      localFilters.status.length +
                      (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 1000 ? 1 : 0) +
                      (localFilters.dateRange[0] !== null || localFilters.dateRange[1] !== null ? 1 : 0)}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] md:w-[400px] p-4 glassmorphism-dropdown">
              <div className="space-y-4">
                <h3 className="font-medium">Filter Products</h3>

                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={localFilters.categories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={localFilters.priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={(value) => handleFilterChange("priceRange", value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${localFilters.priceRange[0]}</span>
                      <span>${localFilters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {["active", "draft", "out-of-stock"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={localFilters.status.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        />
                        <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                          {status.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Date Added</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal h-9">
                            {localFilters.dateRange[0] ? (
                              localFilters.dateRange[0].toLocaleDateString()
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 glassmorphism-dropdown" align="start">
                          <Calendar
                            mode="single"
                            selected={localFilters.dateRange[0]}
                            onSelect={(date) => handleFilterChange("dateRange", [date, localFilters.dateRange[1]])}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-xs">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal h-9">
                            {localFilters.dateRange[1] ? (
                              localFilters.dateRange[1].toLocaleDateString()
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 glassmorphism-dropdown" align="start">
                          <Calendar
                            mode="single"
                            selected={localFilters.dateRange[1]}
                            onSelect={(date) => handleFilterChange("dateRange", [localFilters.dateRange[0], date])}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={onClearFilters} className="text-sm">
                    Clear All
                  </Button>

                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="text-sm">
                            <Save className="h-3.5 w-3.5 mr-1" />
                            Save
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save this filter preset for later use</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button size="sm" onClick={handleApplyFilters} className="text-sm">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {isFiltersActive() && (
            <Button variant="outline" size="icon" onClick={onClearFilters} className="h-10 w-10">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isFiltersActive() && (
        <div className="flex flex-wrap gap-2 mt-4">
          {localFilters.categories.length > 0 && (
            <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
              Categories: {localFilters.categories.length}
              <button
                onClick={() => handleFilterChange("categories", [])}
                className="ml-1 text-primary hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {(localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 1000) && (
            <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
              Price: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
              <button
                onClick={() => handleFilterChange("priceRange", [0, 1000])}
                className="ml-1 text-primary hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {localFilters.status.length > 0 && (
            <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
              Status: {localFilters.status.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")}
              <button
                onClick={() => handleFilterChange("status", [])}
                className="ml-1 text-primary hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {(localFilters.dateRange[0] !== null || localFilters.dateRange[1] !== null) && (
            <div className="bg-primary/10 text-primary text-xs rounded-full px-3 py-1 flex items-center">
              Date: {localFilters.dateRange[0]?.toLocaleDateString() || "Any"} -{" "}
              {localFilters.dateRange[1]?.toLocaleDateString() || "Any"}
              <button
                onClick={() => handleFilterChange("dateRange", [null, null])}
                className="ml-1 text-primary hover:text-primary/80"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
