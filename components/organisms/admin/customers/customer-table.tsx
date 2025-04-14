"use client"

import { useState } from "react"
import { useDispatch } from "@/store/hooks"
import { MoreHorizontal, Edit, Trash, UserCog, Eye, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Pagination from "@/components/molecules/pagination"
import { mockCustomers } from "@/data/mock-customers"
import {
  selectCustomer,
  deselectCustomer,
  selectAllCustomers,
  deselectAllCustomers,
} from "@/store/slices/customerSlice"

interface CustomerTableProps {
  onViewDetails: (customerId: string) => void
  onEditCustomer: (customerId: string) => void
}

export default function CustomerTable({ onViewDetails, onEditCustomer }: CustomerTableProps) {
  const dispatch = useDispatch()
  const [sortField, setSortField] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // For demo purposes, we're using mock data
  // In a real app, this would be filtered and sorted by Redux
  const customers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  // Get current customers for pagination
  const indexOfLastCustomer = currentPage * itemsPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = currentCustomers.map((customer) => customer.id)
      setSelectedCustomers(allIds)
      dispatch(selectAllCustomers(allIds))
    } else {
      setSelectedCustomers([])
      dispatch(deselectAllCustomers())
    }
  }

  const handleSelectCustomer = (customerId: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId])
      dispatch(selectCustomer(customerId))
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
      dispatch(deselectCustomer(customerId))
    }
  }

  const handleDelete = (customerId: string) => {
    // In a real app, this would dispatch a Redux action to delete the customer
    console.log("Delete customer:", customerId)
  }

  const handleLoginAs = (customerId: string) => {
    // In a real app, this would authenticate as the customer
    console.log("Login as customer:", customerId)
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortOrder === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <Card className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedCustomers.length === currentCustomers.length && currentCustomers.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all customers"
                />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <button className="flex items-center font-medium text-left" onClick={() => handleSort("name")}>
                  Name {getSortIcon("name")}
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center font-medium text-left" onClick={() => handleSort("email")}>
                  Email {getSortIcon("email")}
                </button>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <button
                  className="flex items-center font-medium text-left"
                  onClick={() => handleSort("dateRegistered")}
                >
                  Date Registered {getSortIcon("dateRegistered")}
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center font-medium text-left" onClick={() => handleSort("ordersCount")}>
                  Orders {getSortIcon("ordersCount")}
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center font-medium text-left" onClick={() => handleSort("totalSpent")}>
                  Total Spent {getSortIcon("totalSpent")}
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center font-medium text-left" onClick={() => handleSort("lastOrderDate")}>
                  Last Order {getSortIcon("lastOrderDate")}
                </button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={(checked) => handleSelectCustomer(customer.id, !!checked)}
                    aria-label={`Select ${customer.name}`}
                  />
                </TableCell>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.dateRegistered}</TableCell>
                <TableCell>
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 py-1 px-2 rounded-full text-xs font-medium">
                    {customer.ordersCount}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                <TableCell>{customer.lastOrderDate || "Never"}</TableCell>
                <TableCell>
                  {customer.status === "active" ? (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(customer.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditCustomer(customer.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLoginAs(customer.id)}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Login as
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="h-24 text-center">
                  No customers found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{" "}
          <span className="font-medium">
            {indexOfLastCustomer > customers.length ? customers.length : indexOfLastCustomer}
          </span>{" "}
          of <span className="font-medium">{customers.length}</span> customers
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(customers.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  )
}
