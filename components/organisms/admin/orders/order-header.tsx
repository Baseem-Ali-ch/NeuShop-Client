"use client"

import { useState } from "react"
import { Calendar, FileDown, FilePlus, RefreshCw, Filter, ChevronDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

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
        

        <Button variant="outline" size="sm" className="h-9" onClick={toggleFilters}>
          <Filter className="h-4 w-4 mr-2" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Export <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" /> Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" /> Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  )
}
