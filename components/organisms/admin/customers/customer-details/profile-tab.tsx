"use client"

import { useMemo } from "react"
import { User, Mail, Phone, Calendar, Globe, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface CustomerProfileTabProps {
  customer: any // In a real app, this would use a proper type
}

export default function CustomerProfileTab({ customer }: CustomerProfileTabProps) {
  const customerAge = useMemo(() => {
    // In a real app, this would calculate the customer age based on registration date
    return "1 year, 3 months"
  }, [customer])

  const personalInfo = [
    { icon: User, label: "Full Name", value: customer.name },
    { icon: Mail, label: "Email Address", value: customer.email },
    { icon: Phone, label: "Phone Number", value: customer.phone },
    { icon: Calendar, label: "Registered On", value: customer.dateRegistered },
    { icon: Globe, label: "Registration Source", value: "Website Sign-up" },
    { icon: Shield, label: "Account Status", value: customer.status === "active" ? "Active" : "Inactive" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <Card>
          <CardContent className="p-6 grid gap-y-5">
            {personalInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mr-4">
                  <item.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">{item.label}</Label>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Customer Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Purchase Behavior</h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">Total Spent</Label>
                  <p className="text-2xl font-bold">{customer.totalSpent}</p>
                </div>
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">Orders Count</Label>
                  <p className="text-2xl font-bold">{customer.ordersCount}</p>
                </div>
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">Avg. Order Value</Label>
                  <p className="text-2xl font-bold">
                    {customer.ordersCount > 0
                      ? `$${(Number.parseFloat(customer.totalSpent.replace("$", "")) / customer.ordersCount).toFixed(2)}`
                      : "$0.00"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Customer Details</h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">Customer Age</Label>
                  <p className="text-2xl font-bold">{customerAge}</p>
                </div>
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">Customer Group</Label>
                  <div className="flex gap-2 mt-1">
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100">
                      {customer.ordersCount > 5 ? "Regular" : "New"}
                    </Badge>
                    {Number.parseFloat(customer.totalSpent.replace("$", "")) > 500 && (
                      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 hover:bg-amber-100">
                        VIP
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-500 dark:text-gray-400 text-sm">Last Seen</Label>
                  <p className="text-lg font-medium">{customer.lastOrderDate || "Never"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
