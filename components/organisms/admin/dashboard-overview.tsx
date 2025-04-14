"use client"

import type React from "react"

import { ArrowDownIcon, ArrowUpIcon, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: {
    value: number
    trend: "up" | "down"
  }
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="rounded-xl bg-card p-6 transition-all duration-200 hover:shadow-md border border-border neumorphic-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          <div className="mt-1 flex items-center">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                change.trend === "up"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
              )}
            >
              {change.trend === "up" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {Math.abs(change.value)}%
            </span>
            <span className="ml-2 text-xs text-muted-foreground">vs last period</span>
          </div>
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </div>
  )
}

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,780",
      change: { value: 12.5, trend: "up" as const },
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Total Orders",
      value: "573",
      change: { value: 8.2, trend: "up" as const },
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "New Customers",
      value: "128",
      change: { value: 5.1, trend: "up" as const },
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: { value: 1.2, trend: "down" as const },
      icon: <Package className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} />
      ))}
    </div>
  )
}
