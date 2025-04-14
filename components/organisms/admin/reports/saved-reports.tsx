"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Play, Pencil, Share, Trash2, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for saved reports
const savedReports = [
  {
    id: 1,
    name: "Monthly Sales Summary",
    description: "Overview of sales performance for the current month",
    lastRun: "2023-04-10T14:30:00",
    createdBy: "John Smith",
    scheduled: true,
    shared: true,
  },
  {
    id: 2,
    name: "Product Performance Q1",
    description: "Detailed product performance analysis for Q1",
    lastRun: "2023-04-05T09:15:00",
    createdBy: "Jane Doe",
    scheduled: false,
    shared: true,
  },
  {
    id: 3,
    name: "Customer Acquisition Report",
    description: "Analysis of customer acquisition channels and costs",
    lastRun: "2023-04-01T16:45:00",
    createdBy: "John Smith",
    scheduled: true,
    shared: false,
  },
  {
    id: 4,
    name: "Inventory Valuation",
    description: "Current inventory valuation by product category",
    lastRun: "2023-03-28T11:20:00",
    createdBy: "Sarah Johnson",
    scheduled: false,
    shared: false,
  },
  {
    id: 5,
    name: "Marketing Campaign ROI",
    description: "ROI analysis for recent marketing campaigns",
    lastRun: "2023-03-25T13:10:00",
    createdBy: "Mike Wilson",
    scheduled: true,
    shared: true,
  },
]

export default function SavedReports() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Access and manage your saved report templates</CardDescription>
            </div>
            <Button>Create New Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{formatDate(report.lastRun)}</TableCell>
                  <TableCell>{report.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {report.scheduled && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Scheduled
                        </Badge>
                      )}
                      {report.shared && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Share className="h-3 w-3 mr-1" />
                          Shared
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="h-4 w-4 mr-2" />
                          Run Report
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
