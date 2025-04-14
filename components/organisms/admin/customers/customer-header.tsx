"use client"

import { Search, Plus, Upload, Download, Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface CustomerHeaderProps {
  onAddCustomer: () => void
  onToggleFilters: () => void
  isFilterVisible: boolean
}

export default function CustomerHeader({ onAddCustomer, onToggleFilters, isFilterVisible }: CustomerHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customers</h1>

        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={onAddCustomer} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Import/Export <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Import Customers
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" /> Export All
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" /> Export Selected
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" /> Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" /> Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant={isFilterVisible ? "default" : "outline"}
            onClick={onToggleFilters}
            className={isFilterVisible ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {isFilterVisible ? (
              <>
                <X className="mr-2 h-4 w-4" /> Hide Filters
              </>
            ) : (
              <>
                <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search customers by name, email, or phone number..."
          className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
        />
      </div>
    </div>
  )
}
