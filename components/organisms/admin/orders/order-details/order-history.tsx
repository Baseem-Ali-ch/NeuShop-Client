"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface OrderHistoryProps {
  order: any
}

export default function OrderHistory({ order }: OrderHistoryProps) {
  const [activeTab, setActiveTab] = useState("internal")
  const [newNote, setNewNote] = useState("")

  // Mock notes data
  const internalNotes = [
    {
      id: 1,
      author: {
        name: "Admin User",
        avatar: "/golden-outback.png",
      },
      content:
        "Customer requested expedited shipping after order was placed. Applied $10 shipping upgrade at no cost as a courtesy.",
      timestamp: "2023-06-15T14:30:00",
    },
    {
      id: 2,
      author: {
        name: "Support Agent",
        avatar: "/abstract-geometric-shapes.png",
      },
      content: "Called customer to confirm shipping address details.",
      timestamp: "2023-06-14T11:15:00",
    },
  ]

  const customerNotes = [
    {
      id: 1,
      author: {
        name: "System",
        avatar: "/abstract-synergy.png",
      },
      content: "Please leave the package at the front door, thank you!",
      timestamp: "2023-06-14T09:45:00",
      isCustomer: true,
    },
  ]

  // Mock audit log
  const auditLog = [
    {
      id: 1,
      action: "Order Created",
      user: "Customer",
      timestamp: "2023-06-14T09:30:00",
      details: "Order placed through website",
    },
    {
      id: 2,
      action: "Payment Processed",
      user: "System",
      timestamp: "2023-06-14T09:31:00",
      details: "Payment of $129.99 processed successfully",
    },
    {
      id: 3,
      action: "Status Updated",
      user: "Admin User",
      timestamp: "2023-06-14T10:15:00",
      details: 'Status changed from "Pending" to "Processing"',
    },
    {
      id: 4,
      action: "Shipping Label Created",
      user: "Admin User",
      timestamp: "2023-06-15T11:30:00",
      details: "Shipping label generated with tracking number",
    },
    {
      id: 5,
      action: "Status Updated",
      user: "Admin User",
      timestamp: "2023-06-15T11:35:00",
      details: 'Status changed from "Processing" to "Shipped"',
    },
  ]

  const handleAddNote = () => {
    if (!newNote.trim()) return

    // In a real app, you would add the note to the database
    console.log(`Adding ${activeTab} note: ${newNote}`)

    // Clear the input
    setNewNote("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="internal" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="internal">Internal Notes</TabsTrigger>
              <TabsTrigger value="customer">Customer Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="internal" className="space-y-4">
              <div className="space-y-4">
                {internalNotes.map((note) => (
                  <div key={note.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={note.author.avatar} alt={note.author.name} />
                      <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{note.author.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(note.timestamp), "MMM dd, yyyy h:mm a")}
                        </div>
                      </div>
                      <div className="text-sm">{note.content}</div>
                    </div>
                  </div>
                ))}

                {internalNotes.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">No internal notes yet</div>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Add an internal note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customer" className="space-y-4">
              <div className="space-y-4">
                {customerNotes.map((note) => (
                  <div key={note.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={note.author.avatar} alt={note.author.name} />
                      <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{note.author.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(note.timestamp), "MMM dd, yyyy h:mm a")}
                        </div>
                      </div>
                      <div className="text-sm">{note.content}</div>
                    </div>
                  </div>
                ))}

                {customerNotes.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">No customer notes yet</div>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Add a note visible to the customer..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Audit Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLog.map((entry) => (
              <div key={entry.id} className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">{entry.action}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(entry.timestamp), "MMM dd, yyyy h:mm a")}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">By: {entry.user}</div>
                  <div className="text-sm mt-1">{entry.details}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
