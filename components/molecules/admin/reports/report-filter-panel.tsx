"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { useDispatch } from "react-redux"
import { toggleFilterPanel } from "@/store/slices/reportsSlice"

export function ReportFilterPanel() {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    minOrderValue: "",
    maxOrderValue: "",
    paymentMethod: "",
    status: "",
    includeRefunded: false,
    includeShipping: true,
    includeTax: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleApplyFilters = () => {
    // In a real app, this would dispatch an action to apply the filters
    console.log("Applying filters:", filters)
  }

  const handleResetFilters = () => {
    setFilters({
      minOrderValue: "",
      maxOrderValue: "",
      paymentMethod: "",
      status: "",
      includeRefunded: false,
      includeShipping: true,
      includeTax: true,
    })
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Report Filters</h3>
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleFilterPanel())}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-order-value">Min Order Value</Label>
            <Input
              id="min-order-value"
              placeholder="0.00"
              value={filters.minOrderValue}
              onChange={(e) => handleChange("minOrderValue", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-order-value">Max Order Value</Label>
            <Input
              id="max-order-value"
              placeholder="0.00"
              value={filters.maxOrderValue}
              onChange={(e) => handleChange("maxOrderValue", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select value={filters.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
              <SelectTrigger id="payment-method">
                <SelectValue placeholder="All payment methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All payment methods</SelectItem>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="apple-pay">Apple Pay</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Order Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-refunded"
                checked={filters.includeRefunded}
                onCheckedChange={(checked) => handleChange("includeRefunded", checked === true)}
              />
              <Label htmlFor="include-refunded">Include Refunded Orders</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-shipping"
                checked={filters.includeShipping}
                onCheckedChange={(checked) => handleChange("includeShipping", checked === true)}
              />
              <Label htmlFor="include-shipping">Include Shipping</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-tax"
                checked={filters.includeTax}
                onCheckedChange={(checked) => handleChange("includeTax", checked === true)}
              />
              <Label htmlFor="include-tax">Include Tax</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}
