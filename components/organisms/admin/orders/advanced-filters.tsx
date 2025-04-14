"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { setAdvancedFilters, clearFilters } from "@/store/slices/orderSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdvancedFilters() {
  const dispatch = useAppDispatch()
  const [filters, setFilters] = useState({
    customerSearch: "",
    paymentMethod: "",
    fulfillmentStatus: "",
    minPrice: "",
    maxPrice: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = () => {
    dispatch(setAdvancedFilters(filters))
  }

  const handleClearFilters = () => {
    setFilters({
      customerSearch: "",
      paymentMethod: "",
      fulfillmentStatus: "",
      minPrice: "",
      maxPrice: "",
    })
    dispatch(clearFilters())
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="customerSearch">Customer</Label>
          <Input
            id="customerSearch"
            name="customerSearch"
            placeholder="Search name or email"
            value={filters.customerSearch}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select value={filters.paymentMethod} onValueChange={(value) => handleSelectChange("paymentMethod", value)}>
            <SelectTrigger id="paymentMethod" className="mt-1">
              <SelectValue placeholder="All payment methods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All payment methods</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="apple_pay">Apple Pay</SelectItem>
              <SelectItem value="google_pay">Google Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="fulfillmentStatus">Fulfillment Status</Label>
          <Select
            value={filters.fulfillmentStatus}
            onValueChange={(value) => handleSelectChange("fulfillmentStatus", value)}
          >
            <SelectTrigger id="fulfillmentStatus" className="mt-1">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
              <SelectItem value="partially_fulfilled">Partially Fulfilled</SelectItem>
              <SelectItem value="fulfilled">Fulfilled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              name="minPrice"
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex items-end space-x-2">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleClearFilters} className="flex-1">
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}
