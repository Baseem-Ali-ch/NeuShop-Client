"use client"

import { Users, UserPlus, DollarSign, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function CustomerMetrics() {
  // In a real app, this data would come from your Redux store
  const metrics = [
    {
      title: "Total Customers",
      value: "14,592",
      icon: Users,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "New This Month",
      value: "487",
      change: "+12.3%",
      isPositive: true,
      icon: UserPlus,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-sm border-0 hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <metric.icon size={96} />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h3>
                  {metric.change && (
                    <span
                      className={`text-sm font-medium ${metric.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {metric.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
