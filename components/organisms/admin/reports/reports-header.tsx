"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { setDateRange, toggleCompareMode } from "@/store/slices/reportsSlice"
import { format } from "date-fns"
import { Calendar, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DatePickerWithRange } from "@/components/molecules/date-picker-with-range"
import { cn } from "@/lib/utils"

interface ReportsHeaderProps {
  onRefresh: () => void
  lastUpdated: Date
}

export default function ReportsHeader({ onRefresh, lastUpdated }: ReportsHeaderProps) {
  const dispatch = useDispatch()
  const { dateRange, compareMode } = useSelector((state: RootState) => state.reports)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const presets = [
    { label: "Today", value: "today", days: 0 },
    { label: "Yesterday", value: "yesterday", days: 1 },
    { label: "This Week", value: "thisWeek", days: 7 },
    { label: "This Month", value: "thisMonth", days: 0, type: "month" },
    { label: "Last Month", value: "lastMonth", days: 0, type: "lastMonth" },
    { label: "Quarter", value: "quarter", days: 90 },
    { label: "Year", value: "year", days: 365 },
  ]

  const handlePresetClick = (preset: any) => {
    const today = new Date()
    let from = new Date()
    let to = new Date()

    if (preset.type === "month") {
      from = new Date(today.getFullYear(), today.getMonth(), 1)
      to = today
    } else if (preset.type === "lastMonth") {
      const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1
      const year = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear()
      from = new Date(year, lastMonth, 1)
      to = new Date(year, lastMonth + 1, 0)
    } else {
      from = new Date(today)
      if (preset.value === "yesterday") {
        from.setDate(from.getDate() - 1)
        to = new Date(from)
      } else {
        from.setDate(from.getDate() - preset.days)
      }
    }

    dispatch(setDateRange({ from, to, preset: preset.value }))
  }

  const getActiveDateRangeText = () => {
    if (!dateRange.from || !dateRange.to) return "Select date range"

    const preset = presets.find((p) => p.value === dateRange.preset)
    if (preset) return preset.label

    return `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    onRefresh()
    setTimeout(() => setIsRefreshing(false), 800)
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-100 mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Exports</h1>
            <p className="text-muted-foreground">Comprehensive analytics and data exports for your store</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-start sm:justify-between gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{getActiveDateRangeText()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                {presets.map((preset) => (
                  <DropdownMenuItem
                    key={preset.value}
                    className={cn("cursor-pointer", dateRange.preset === preset.value && "bg-muted")}
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.label}
                  </DropdownMenuItem>
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start font-normal mt-1">
                      Custom Range
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DatePickerWithRange
                      dateRange={dateRange}
                      onChange={(range) => dispatch(setDateRange({ ...range, preset: undefined }))}
                    />
                  </PopoverContent>
                </Popover>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Switch id="compare-mode" checked={compareMode} onCheckedChange={() => dispatch(toggleCompareMode())} />
                <Label htmlFor="compare-mode" className="cursor-pointer">
                  Compare
                </Label>
              </div>

              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              </Button>

              <div className="text-xs text-muted-foreground hidden md:block">
                Last updated: {format(lastUpdated, "h:mm a")}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
