"use client"

import { BarChart, PlusCircle, Send, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuickActions() {
  const actions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: <PlusCircle className="h-5 w-5" />,
      href: "/admin/products/new",
    },
    {
      title: "Process Orders",
      description: "View and manage pending orders",
      icon: <ShoppingBag className="h-5 w-5" />,
      href: "/admin/orders",
    },
    {
      title: "Generate Reports",
      description: "Create sales and inventory reports",
      icon: <BarChart className="h-5 w-5" />,
      href: "/admin/reports",
    },
    {
      title: "Marketing Campaign",
      description: "Create and send email campaigns",
      icon: <Send className="h-5 w-5" />,
      href: "/admin/marketing",
    },
  ]

  return (
    <Card className="neumorphic-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              className="flex items-center space-x-3 rounded-lg border border-border p-3 transition-all hover:bg-muted/50"
            >
              <div className="rounded-full bg-primary/10 p-2 text-primary">{action.icon}</div>
              <div>
                <h4 className="text-sm font-medium">{action.title}</h4>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
