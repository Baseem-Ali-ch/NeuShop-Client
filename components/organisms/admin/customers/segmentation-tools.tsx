"use client"

import { useState } from "react"
import { UserPlus, Users, Clock, Star, AlertTriangle, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function SegmentationTools() {
  const [segments, setSegments] = useState([
    {
      id: "1",
      name: "VIP Customers",
      description: "Customers who spent over $500 in the last 3 months",
      count: 124,
      icon: Star,
      color: "text-amber-500",
    },
    {
      id: "2",
      name: "At-risk",
      description: "No orders in the last 90 days",
      count: 86,
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: "3",
      name: "First-time Customers",
      description: "Made their first purchase in the last 30 days",
      count: 258,
      icon: UserPlus,
      color: "text-green-500",
    },
    {
      id: "4",
      name: "Regular Customers",
      description: "2+ orders in the last 6 months",
      count: 579,
      icon: Users,
      color: "text-blue-500",
    },
    {
      id: "5",
      name: "Recent Website Visits",
      description: "Visited the website in the last 7 days",
      count: 427,
      icon: Clock,
      color: "text-purple-500",
    },
  ])

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border-0 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Customer Segments</CardTitle>
          <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" /> Create Segment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[calc(100vh-28rem)] pr-4">
          <div className="space-y-4">
            {segments.map((segment) => (
              <div key={segment.id} className="group">
                <div className="flex items-start justify-between rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5 rounded-full p-1.5 ${segment.color} bg-opacity-10`}>
                      <segment.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{segment.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{segment.description}</div>
                    </div>
                  </div>
                  <div className="rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium">
                    {segment.count}
                  </div>
                </div>
                <Separator className="my-1" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
