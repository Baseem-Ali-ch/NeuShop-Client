"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { mockCustomers } from "@/data/mock-customers"

interface CustomerFormModalProps {
  customerId: string | null
  onClose: () => void
}

export default function CustomerFormModal({ customerId, onClose }: CustomerFormModalProps) {
  const isEditMode = !!customerId

  // In a real app, fetch the customer data from Redux if in edit mode
  const customer = customerId ? mockCustomers.find((c) => c.id === customerId) : null

  const [activeTab, setActiveTab] = useState("personal")

  const [formData, setFormData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    status: customer?.status || "active",
    group: "retail",
    notes: "",
    marketingConsent: true,
    // Add other form fields as needed
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = () => {
    // In a real app, dispatch actions to save the customer data
    console.log("Saving customer:", formData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? `Edit Customer: ${customer?.name}` : "Add New Customer"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update customer information using the form below."
              : "Fill out the form below to add a new customer to your store."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="address">Addresses</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="group">Customer Group</Label>
                <Select value={formData.group} onValueChange={(value) => handleChange("group", value)}>
                  <SelectTrigger id="group">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password {isEditMode && "(leave blank to keep unchanged)"}</Label>
                <Input id="password" type="password" placeholder={isEditMode ? "••••••••" : "Enter password"} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Account Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this customer..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <p className="text-gray-500 text-sm">
              {isEditMode
                ? "You can manage this customer's addresses after creating their account."
                : "You can add addresses to this customer after creating their account."}
            </p>

            {isEditMode && (
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">Default Address</p>
                <p className="text-sm text-gray-500">
                  {customer?.address || "123 Main Street, Brooklyn, NY 11201, United States"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Customer will receive marketing emails and promotions</p>
                </div>
                <Switch
                  id="marketing"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleChange("marketingConsent", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Customer will receive SMS notifications about orders</p>
                </div>
                <Switch id="sms" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter">Weekly Newsletter</Label>
                  <p className="text-sm text-gray-500">Opt in to weekly newsletter and product updates</p>
                </div>
                <Switch id="newsletter" defaultChecked />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name || !formData.email}>
            {isEditMode ? "Update Customer" : "Create Customer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
