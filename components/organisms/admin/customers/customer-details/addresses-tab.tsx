"use client"

import { useState } from "react"
import { Plus, MapPin, Edit, Trash, Check, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Address {
  id: string
  type: "billing" | "shipping" | "both"
  isDefault: boolean
  isValidated: boolean
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface CustomerAddressesTabProps {
  customerId: string
}

export default function CustomerAddressesTab({ customerId }: CustomerAddressesTabProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "both",
      isDefault: true,
      isValidated: true,
      streetAddress: "123 Main Street, Apt 4B",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11201",
      country: "United States",
    },
    {
      id: "2",
      type: "shipping",
      isDefault: false,
      isValidated: false,
      streetAddress: "456 Park Avenue",
      city: "New York",
      state: "NY",
      postalCode: "10022",
      country: "United States",
    },
  ])

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

  const openAddAddressModal = () => {
    setCurrentAddress(null)
    setIsAddressModalOpen(true)
  }

  const openEditAddressModal = (address: Address) => {
    setCurrentAddress(address)
    setIsAddressModalOpen(true)
  }

  const closeAddressModal = () => {
    setIsAddressModalOpen(false)
    setCurrentAddress(null)
  }

  const handleSaveAddress = () => {
    // In a real app, this would update the address in the Redux store
    closeAddressModal()
  }

  const handleDeleteAddress = (addressId: string) => {
    // In a real app, this would dispatch a Redux action to delete the address
    setAddresses(addresses.filter((address) => address.id !== addressId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Customer Addresses</h3>
        <Button onClick={openAddAddressModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <div>
                    <span className="font-medium">
                      {address.type === "both"
                        ? "Billing & Shipping"
                        : address.type === "billing"
                          ? "Billing"
                          : "Shipping"}
                    </span>
                    {address.isDefault && (
                      <Badge className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditAddressModal(address)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!address.isDefault && (
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p>{address.streetAddress}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>

              <div className="mt-4">
                {address.isValidated ? (
                  <div className="flex items-center text-green-600 text-xs">
                    <Check className="h-3 w-3 mr-1" /> Address validated
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" /> Not validated
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addressType" className="text-right">
                Type
              </Label>
              <Select defaultValue={currentAddress?.type || "shipping"}>
                <SelectTrigger id="addressType" className="col-span-3">
                  <SelectValue placeholder="Address Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="both">Billing & Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="streetAddress" className="text-right">
                Street
              </Label>
              <Input id="streetAddress" defaultValue={currentAddress?.streetAddress || ""} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input id="city" defaultValue={currentAddress?.city || ""} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input id="state" defaultValue={currentAddress?.state || ""} />
                <Input id="postalCode" defaultValue={currentAddress?.postalCode || ""} placeholder="Postal Code" />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Select defaultValue={currentAddress?.country || "United States"}>
                <SelectTrigger id="country" className="col-span-3">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 flex items-center space-x-2">
                <Checkbox id="isDefault" defaultChecked={currentAddress?.isDefault || false} />
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set as default address
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeAddressModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveAddress}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
