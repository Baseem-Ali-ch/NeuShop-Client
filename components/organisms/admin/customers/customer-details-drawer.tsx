"use client"

import { useState } from "react"
import { X, User, MapPin, ShoppingBag, Mail, FileText } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomerProfileTab from "./customer-details/profile-tab"
import CustomerAddressesTab from "./customer-details/addresses-tab"
import CustomerOrdersTab from "./customer-details/orders-tab"
import CustomerCommunicationTab from "./customer-details/communication-tab"
import CustomerNotesTab from "./customer-details/notes-tab"
import { mockCustomers } from "@/data/mock-customers"

interface CustomerDetailsDrawerProps {
  customerId: string
  onClose: () => void
  onEdit: () => void
}

export default function CustomerDetailsDrawer({ customerId, onClose, onEdit }: CustomerDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState("profile")

  // In a real app, this would be fetched through Redux
  const customer = mockCustomers.find((c) => c.id === customerId)

  if (!customer) return null

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl w-full p-0 overflow-y-auto">
        <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{customer.name}</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit Customer
            </Button>
            {customer.status === "active" ? (
              <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                Deactivate Account
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                Activate Account
              </Button>
            )}
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid grid-cols-5 h-auto p-0 bg-gray-100 dark:bg-gray-700 rounded-none">
            <TabsTrigger
              value="profile"
              className="py-3 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <User className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="py-3 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <MapPin className="h-4 w-4 mr-2" /> Addresses
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="py-3 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <ShoppingBag className="h-4 w-4 mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger
              value="communication"
              className="py-3 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <Mail className="h-4 w-4 mr-2" /> Comm.
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="py-3 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              <FileText className="h-4 w-4 mr-2" /> Notes
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="profile" className="m-0">
              <CustomerProfileTab customer={customer} />
            </TabsContent>

            <TabsContent value="addresses" className="m-0">
              <CustomerAddressesTab customerId={customerId} />
            </TabsContent>

            <TabsContent value="orders" className="m-0">
              <CustomerOrdersTab customerId={customerId} />
            </TabsContent>

            <TabsContent value="communication" className="m-0">
              <CustomerCommunicationTab customerId={customerId} />
            </TabsContent>

            <TabsContent value="notes" className="m-0">
              <CustomerNotesTab customerId={customerId} />
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
