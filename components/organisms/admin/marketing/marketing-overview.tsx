"use client"

import { BarChart3, Mail, Percent, Tag, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MarketingOverview() {
  const stats = [
    {
      title: "Active Campaigns",
      value: "12",
      change: "+2",
      icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Scheduled Promotions",
      value: "8",
      change: "+3",
      icon: <Tag className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Total Discounts",
      value: "$4,280",
      change: "+$520",
      icon: <Percent className="h-5 w-5 text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+2.4%",
      icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-50",
    },
    {
      title: "Email Subscribers",
      value: "8,742",
      change: "+156",
      icon: <Mail className="h-5 w-5 text-rose-500" />,
      color: "bg-rose-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.color}`}>{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium text-green-600">{stat.change}</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
