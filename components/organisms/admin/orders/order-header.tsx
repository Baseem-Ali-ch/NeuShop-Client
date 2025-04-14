"use client"

import { useState } from "react"
import { Calendar, FileDown, FilePlus, RefreshCw, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface OrderHeaderProps {
  toggleFilters: () => void
  isFilterOpen: boolean
}

export default function OrderHeader({ toggleFilters, isFilterOpen }: OrderHeaderProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  })

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and process customer orders</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="h-4 w-4 mr-2" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, yyyy")
                )
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => setDateRange(range as any)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="sm" className="h-9" onClick={toggleFilters}>
          <Filter className="h-4 w-4 mr-2" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>

        <Button variant="outline" size="sm" className="h-9">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>

        <Button variant="outline" size="sm" className="h-9">
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>

        <Button size="sm" className="h-9">
          <FilePlus className="h-4 w-4 mr-2" />
          Create Order
        </Button>
      </div>
    </div>
  )
}
