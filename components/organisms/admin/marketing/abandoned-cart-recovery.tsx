"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Mail, Settings, BarChart3 } from "lucide-react"

export default function AbandonedCartRecovery() {
  const [activeTab, setActiveTab] = useState("emails")

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl font-bold">Abandoned Cart Recovery</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email Templates</span>
            </TabsTrigger>
            <TabsTrigger value="timing" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Timing</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emails" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recovery Email Templates</h3>
              <Button>Create New Template</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["1 Hour", "24 Hours", "72 Hours"].map((timing, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{timing} Reminder</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500 mb-4">Sent {timing.toLowerCase()} after cart abandonment</p>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Active</span>
                        <Switch defaultChecked={index < 2} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Settings className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium">Recovery Incentives</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Offer special discounts to encourage customers to complete their purchase
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incentiveType">Incentive Type</Label>
                      <Select defaultValue="none">
                        <SelectTrigger id="incentiveType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Incentive</SelectItem>
                          <SelectItem value="percent">Percentage Discount</SelectItem>
                          <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                          <SelectItem value="shipping">Free Shipping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incentiveValue">Discount Value</Label>
                      <Input id="incentiveValue" type="number" placeholder="10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timing" className="space-y-6">
            <h3 className="text-lg font-medium">Email Timing Sequence</h3>
            <p className="text-gray-500">Configure when abandoned cart recovery emails are sent to customers</p>

            <div className="space-y-4">
              {[
                { id: "email1", label: "First Email", defaultValue: "1" },
                { id: "email2", label: "Second Email", defaultValue: "24" },
                { id: "email3", label: "Third Email", defaultValue: "72" },
              ].map((email) => (
                <div key={email.id} className="flex items-center gap-4">
                  <div className="w-32">
                    <Label htmlFor={email.id}>{email.label}</Label>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input id={email.id} type="number" defaultValue={email.defaultValue} className="w-20" />
                    <span>hours after abandonment</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t mt-6">
              <h4 className="font-medium mb-4">Advanced Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="stopOnPurchase">Stop sequence on purchase</Label>
                    <p className="text-xs text-gray-500">Stop sending emails if customer completes purchase</p>
                  </div>
                  <Switch id="stopOnPurchase" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="limitFrequency">Limit email frequency</Label>
                    <p className="text-xs text-gray-500">Prevent customers from receiving too many emails</p>
                  </div>
                  <Switch id="limitFrequency" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <h3 className="text-lg font-medium">Recovery Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Abandoned Carts", value: "1,243", change: "+12%" },
                { label: "Recovery Rate", value: "23.5%", change: "+3.2%" },
                { label: "Revenue Recovered", value: "$28,450", change: "+18%" },
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <div className="flex items-end justify-between mt-1">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b">
                <h4 className="font-medium">Email Performance</h4>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Sent</th>
                      <th className="pb-2">Open Rate</th>
                      <th className="pb-2">Click Rate</th>
                      <th className="pb-2">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "1 Hour Reminder", sent: "458", open: "62%", click: "38%", conversion: "15%" },
                      { name: "24 Hour Reminder", sent: "412", open: "48%", click: "29%", conversion: "8%" },
                      { name: "72 Hour Reminder", sent: "373", open: "32%", click: "18%", conversion: "5%" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 font-medium">{row.name}</td>
                        <td className="py-3">{row.sent}</td>
                        <td className="py-3">{row.open}</td>
                        <td className="py-3">{row.click}</td>
                        <td className="py-3">{row.conversion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
