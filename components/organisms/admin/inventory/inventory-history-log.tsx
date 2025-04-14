"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function InventoryHistoryLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  // Mock history data
  const historyData = [
    {
      id: "1",
      timestamp: new Date(2023, 3, 15, 10, 30),
      user: "John Doe",
      product: "Wireless Headphones",
      sku: "SKU001",
      action: "add",
      previousValue: 10,
      newValue: 15,
      reason: "Received",
      location: "Main Warehouse",
    },
    {
      id: "2",
      timestamp: new Date(2023, 3, 14, 14, 45),
      user: "Jane Smith",
      product: "Smartphone Case",
      sku: "SKU002",
      action: "remove",
      previousValue: 25,
      newValue: 20,
      reason: "Damaged",
      location: "East Coast",
    },
    {
      id: "3",
      timestamp: new Date(2023, 3, 14, 9, 15),
      user: "Mike Johnson",
      product: "Bluetooth Speaker",
      sku: "SKU003",
      action: "set",
      previousValue: 8,
      newValue: 12,
      reason: "Recount",
      location: "Main Warehouse",
    },
    {
      id: "4",
      timestamp: new Date(2023, 3, 13, 16, 20),
      user: "Sarah Williams",
      product: "Wireless Headphones",
      sku: "SKU001",
      action: "remove",
      previousValue: 12,
      newValue: 10,
      reason: "Returned",
      location: "Main Warehouse",
    },
    {
      id: "5",
      timestamp: new Date(2023, 3, 12, 11, 10),
      user: "John Doe",
      product: "Smart Watch",
      sku: "SKU004",
      action: "add",
      previousValue: 5,
      newValue: 15,
      reason: "Received",
      location: "West Coast",
    },
  ]

  // Filter history data based on search term and action filter
  const filteredHistory = historyData.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = actionFilter === "all" || item.action === actionFilter

    return matchesSearch && matchesAction
  })

  const getActionBadge = (action: string) => {
    switch (action) {
      case "add":
        return <Badge className="bg-green-500">Added</Badge>
      case "remove":
        return <Badge className="bg-red-500">Removed</Badge>
      case "set":
        return <Badge className="bg-blue-500">Set</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Inventory History Log</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by product, SKU, or user"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="add">Added</SelectItem>
              <SelectItem value="remove">Removed</SelectItem>
              <SelectItem value="set">Set</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-1 cursor-pointer">
                    Timestamp
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Previous</TableHead>
                <TableHead>New</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">{format(item.timestamp, "MMM d, yyyy h:mm a")}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.product}</div>
                      <div className="text-xs text-muted-foreground">{item.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(item.action)}</TableCell>
                  <TableCell>{item.previousValue}</TableCell>
                  <TableCell>{item.newValue}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">No history records found matching your filters.</div>
        )}
      </CardContent>
    </Card>
  )
}
