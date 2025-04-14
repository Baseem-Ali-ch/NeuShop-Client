"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock data for calendar events
const calendarEvents = [
  {
    id: 1,
    title: "Summer Sale Launch",
    date: "2023-06-15",
    type: "discount",
    status: "active",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Back to School Email",
    date: "2023-08-01",
    type: "email",
    status: "scheduled",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Holiday Preview",
    date: "2023-11-15",
    type: "email",
    status: "draft",
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "Black Friday Promotion",
    date: "2023-11-24",
    type: "discount",
    status: "scheduled",
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "Cyber Monday Flash Sale",
    date: "2023-11-27",
    type: "discount",
    status: "scheduled",
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "December Newsletter",
    date: "2023-12-01",
    type: "email",
    status: "draft",
    color: "bg-amber-500",
  },
  {
    id: 7,
    title: "Holiday Shipping Deadline",
    date: "2023-12-15",
    type: "email",
    status: "scheduled",
    color: "bg-blue-500",
  },
  {
    id: 8,
    title: "End of Year Clearance",
    date: "2023-12-26",
    type: "discount",
    status: "scheduled",
    color: "bg-blue-500",
  },
]

// Generate calendar days for a month
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []

  // Add empty cells for days before the first of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, date: null })
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dateString = date.toISOString().split("T")[0]
    const events = calendarEvents.filter((event) => event.date === dateString)
    days.push({ day: i, date: dateString, events })
  }

  return days
}

// Day names
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function MarketingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calendarDays = generateCalendarDays(year, month)

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl font-bold">Marketing Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="font-medium min-w-[140px] text-center">
              {monthNames[month]} {year}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Campaign Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-email" defaultChecked />
                        <Label htmlFor="filter-email">Email Campaigns</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-discount" defaultChecked />
                        <Label htmlFor="filter-discount">Discounts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-social" defaultChecked />
                        <Label htmlFor="filter-social">Social Media</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-active" defaultChecked />
                        <Label htmlFor="filter-active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-scheduled" defaultChecked />
                        <Label htmlFor="filter-scheduled">Scheduled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-draft" defaultChecked />
                        <Label htmlFor="filter-draft">Draft</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Select defaultValue="month">
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div key={day} className="text-center py-2 font-medium text-sm">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] border p-1 ${
                day.day === null ? "bg-gray-50 dark:bg-gray-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
              } ${
                day.date === new Date().toISOString().split("T")[0]
                  ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                  : ""
              }`}
            >
              {day.day !== null && (
                <>
                  <div className="text-sm font-medium">{day.day}</div>
                  <div className="space-y-1 mt-1">
                    {day.events?.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate cursor-pointer ${event.color} text-white`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedEvent.status === "active"
                        ? "default"
                        : selectedEvent.status === "scheduled"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {selectedEvent.status}
                  </Badge>
                  <Badge variant="outline">
                    {selectedEvent.type === "email"
                      ? "Email Campaign"
                      : selectedEvent.type === "discount"
                        ? "Discount Promotion"
                        : "Social Media Campaign"}
                  </Badge>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline">Edit</Button>
                  <Button>View Details</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
