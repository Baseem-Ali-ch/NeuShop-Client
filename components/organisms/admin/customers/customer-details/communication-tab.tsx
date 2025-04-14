"use client"

import { useState } from "react"
import { Mail, Send, MessageSquare, Bell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface CustomerCommunicationTabProps {
  customerId: string
}

export default function CustomerCommunicationTab({ customerId }: CustomerCommunicationTabProps) {
  const [marketingPreferences, setMarketingPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  })

  const [emailMessage, setEmailMessage] = useState("")

  // In a real app, this would be fetched from your API or Redux
  const communicationHistory = [
    {
      id: "1",
      type: "email",
      subject: "Welcome to our store!",
      date: "2023-09-15 10:23 AM",
      status: "delivered",
      opened: true,
    },
    {
      id: "2",
      type: "email",
      subject: "Your order has been shipped - ORD-1234",
      date: "2023-11-15 02:45 PM",
      status: "delivered",
      opened: true,
    },
    {
      id: "3",
      type: "email",
      subject: "Special holiday discount just for you",
      date: "2023-12-01 08:15 AM",
      status: "delivered",
      opened: false,
    },
    {
      id: "4",
      type: "sms",
      subject: "Your order ORD-1234 has been delivered",
      date: "2023-11-17 03:30 PM",
      status: "delivered",
      opened: true,
    },
  ]

  const handleSendEmail = () => {
    // In a real app, this would dispatch an action to send the email
    console.log("Sending email:", emailMessage)
    setEmailMessage("")
  }

  const getStatusBadge = (status: string, opened: boolean) => {
    if (status === "delivered" && opened) {
      return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Opened</Badge>
    } else if (status === "delivered") {
      return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Delivered</Badge>
    } else if (status === "failed") {
      return <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">Failed</Badge>
    } else {
      return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Marketing Preferences</h3>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>Email Marketing</span>
              </div>
              <Switch
                checked={marketingPreferences.email}
                onCheckedChange={(checked) => setMarketingPreferences({ ...marketingPreferences, email: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span>SMS Notifications</span>
              </div>
              <Switch
                checked={marketingPreferences.sms}
                onCheckedChange={(checked) => setMarketingPreferences({ ...marketingPreferences, sms: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span>Push Notifications</span>
              </div>
              <Switch
                checked={marketingPreferences.push}
                onCheckedChange={(checked) => setMarketingPreferences({ ...marketingPreferences, push: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Communications History</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communicationHistory.map((communication) => (
                  <TableRow key={communication.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {communication.type === "email" ? (
                          <Mail className="h-4 w-4 text-gray-500" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="capitalize">{communication.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{communication.subject}</TableCell>
                    <TableCell>{communication.date}</TableCell>
                    <TableCell>{getStatusBadge(communication.status, communication.opened)}</TableCell>
                  </TableRow>
                ))}
                {communicationHistory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No communications history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Send Custom Email</h3>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="emailTemplate">Email Template</Label>
              <RadioGroup defaultValue="custom" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="welcome" id="welcome" />
                  <Label htmlFor="welcome">Welcome Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="followup" id="followup" />
                  <Label htmlFor="followup">Order Follow-up</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom Message</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here..."
                className="mt-2"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                rows={6}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSendEmail} disabled={!emailMessage.trim()}>
                <Send className="mr-2 h-4 w-4" /> Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
