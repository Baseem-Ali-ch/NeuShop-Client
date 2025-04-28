"use client"

import { useState } from "react"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { DatePickerWithRange } from "@/components/molecules/date-picker-with-range"
import { Badge } from "@/components/ui/badge"

export default function CustomerFilters() {
  const [spendingRange, setSpendingRange] = useState([0, 1000])
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [savedFilters, setSavedFilters] = useState<string[]>(["High-value customers", "Recent signups"])

  const customerGroups = ["All Groups", "Retail", "Wholesale", "VIP", "International"]
  const statuses = ["All", "Active", "Inactive"]

  const handleClearFilters = () => {
    // Reset all filter values
    setSpendingRange([0, 1000])
    setDateRange({ from: undefined, to: undefined })
  }

  const handleSaveFilter = () => {
    // In a real app, this would save the current filter configuration
    const newFilterName = `Saved Filter ${savedFilters.length + 1}`
    setSavedFilters([...savedFilters, newFilterName])
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Advanced Filters</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveFilter}>
              <Save className="mr-2 h-4 w-4" /> Save Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              <X className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dateRegistered">Date Registered</Label>
            <DatePickerWithRange id="dateRegistered" date={dateRange} setDate={setDateRange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Account Status</Label>
            <Select defaultValue={statuses[0]}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {savedFilters.length > 0 && (
          <div className="mt-6">
            <Label className="mb-2 block">Saved Filters</Label>
            <div className="flex flex-wrap gap-2">
              {savedFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 py-1.5"
                >
                  {filter}
                  <X
                    className="ml-1 h-3 w-3"
                    onClick={() => {
                      setSavedFilters(savedFilters.filter((_, i) => i !== index))
                    }}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
