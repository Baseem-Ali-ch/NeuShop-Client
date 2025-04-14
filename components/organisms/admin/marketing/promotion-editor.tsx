"use client"

import type React from "react"

import { useState } from "react"
import { X, Save, Tag, Percent, DollarSign, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/molecules/date-picker-with-range"
import { useToast } from "@/hooks/use-toast"

interface PromotionEditorProps {
  onClose: () => void
  editingPromotion?: any
}

export default function PromotionEditor({ onClose, editingPromotion }: PromotionEditorProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")
  const [promotionType, setPromotionType] = useState(editingPromotion?.type || "percentage")
  const [codeType, setCodeType] = useState("custom")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: editingPromotion ? "Promotion updated" : "Promotion created",
      description: "Your promotion has been saved successfully.",
    })

    setIsSubmitting(false)
    onClose()
  }

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  return (
    <Card className="w-full border-2 border-gray-200 shadow-lg">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            {editingPromotion ? "Edit Promotion" : "Create New Promotion"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4 border-b">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="conditions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Conditions
              </TabsTrigger>
              <TabsTrigger
                value="codes"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Discount Codes
              </TabsTrigger>
              <TabsTrigger
                value="display"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Display
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6">
            <TabsContent value="details" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Promotion Name</Label>
                    <Input
                      id="name"
                      placeholder="Summer Sale 2023"
                      defaultValue={editingPromotion?.name || ""}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Promotion Type</Label>
                    <Select defaultValue={promotionType} onValueChange={setPromotionType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <div className="flex items-center">
                            <Percent className="mr-2 h-4 w-4" />
                            <span>Percentage Discount</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fixed">
                          <div className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4" />
                            <span>Fixed Amount Discount</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bogo">
                          <div className="flex items-center">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            <span>Buy One Get One</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="shipping">
                          <div className="flex items-center">
                            <Tag className="mr-2 h-4 w-4" />
                            <span>Free Shipping</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your promotion"
                    className="min-h-[100px]"
                    defaultValue={editingPromotion?.description || ""}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="value">
                      {promotionType === "percentage"
                        ? "Discount Percentage"
                        : promotionType === "fixed"
                          ? "Discount Amount"
                          : promotionType === "bogo"
                            ? "Buy X Get Y"
                            : ""}
                    </Label>
                    {promotionType !== "shipping" && (
                      <div className="flex items-center">
                        {promotionType === "percentage" && <Percent className="mr-2 h-4 w-4 text-gray-500" />}
                        {promotionType === "fixed" && <DollarSign className="mr-2 h-4 w-4 text-gray-500" />}
                        <Input
                          id="value"
                          type="number"
                          placeholder={promotionType === "percentage" ? "20" : "10.00"}
                          defaultValue={editingPromotion?.value || ""}
                          required={promotionType !== "shipping"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Promotion Period</Label>
                    <DatePickerWithRange className="w-full" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minPurchase">Minimum Purchase Amount</Label>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="minPurchase"
                        type="number"
                        placeholder="50.00"
                        defaultValue={editingPromotion?.minPurchase || ""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Usage Limits</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      placeholder="100"
                      defaultValue={editingPromotion?.usageLimit || ""}
                    />
                    <p className="text-xs text-gray-500">Leave empty for unlimited uses</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Eligible Products</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="specific">Specific Products</SelectItem>
                      <SelectItem value="categories">Product Categories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Customer Eligibility</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer groups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers Only</SelectItem>
                      <SelectItem value="returning">Returning Customers</SelectItem>
                      <SelectItem value="vip">VIP Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="firstTimeOnly">First-Time Customers Only</Label>
                      <p className="text-xs text-gray-500">Limit this promotion to first-time customers</p>
                    </div>
                    <Switch id="firstTimeOnly" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="stackable">Stackable with Other Promotions</Label>
                      <p className="text-xs text-gray-500">Allow this promotion to be used with others</p>
                    </div>
                    <Switch id="stackable" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="codes" className="mt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Discount Code Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant={codeType === "custom" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setCodeType("custom")}
                    >
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">Custom Code</span>
                        <span className="text-xs text-gray-500">Create your own code</span>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={codeType === "auto" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setCodeType("auto")}
                    >
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">Auto-Generate</span>
                        <span className="text-xs text-gray-500">Create a random code</span>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={codeType === "bulk" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setCodeType("bulk")}
                    >
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium">Bulk Generate</span>
                        <span className="text-xs text-gray-500">Create multiple codes</span>
                      </div>
                    </Button>
                  </div>
                </div>

                {codeType === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="code">Discount Code</Label>
                    <Input
                      id="code"
                      placeholder="SUMMER2023"
                      defaultValue={editingPromotion?.code || ""}
                      className="uppercase"
                    />
                    <p className="text-xs text-gray-500">Use only letters and numbers, no spaces</p>
                  </div>
                )}

                {codeType === "auto" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="autoCode">Generated Code</Label>
                      <div className="flex gap-2">
                        <Input id="autoCode" value={generateRandomCode()} readOnly className="uppercase" />
                        <Button type="button" variant="outline" onClick={() => {}}>
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {codeType === "bulk" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulkCount">Number of Codes</Label>
                      <Input id="bulkCount" type="number" placeholder="10" min="1" max="100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prefix">Code Prefix (Optional)</Label>
                      <Input id="prefix" placeholder="SUMMER" className="uppercase" />
                    </div>
                    <Button type="button" variant="outline" className="w-full">
                      Generate Bulk Codes
                    </Button>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button type="button" variant="outline" className="w-full">
                    Import Codes from CSV
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="mt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bannerText">Promotion Banner Text</Label>
                  <Input
                    id="bannerText"
                    placeholder="Summer Sale - 20% Off Everything!"
                    defaultValue={editingPromotion?.bannerText || ""}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showHomepage">Display on Homepage</Label>
                      <p className="text-xs text-gray-500">Show this promotion on the homepage</p>
                    </div>
                    <Switch id="showHomepage" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showCart">Show in Cart</Label>
                      <p className="text-xs text-gray-500">Display this promotion in the shopping cart</p>
                    </div>
                    <Switch id="showCart" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showBadge">Show Product Badge</Label>
                      <p className="text-xs text-gray-500">Display a badge on eligible products</p>
                    </div>
                    <Switch id="showBadge" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badgeText">Badge Text</Label>
                  <Input id="badgeText" placeholder="SALE" defaultValue={editingPromotion?.badgeText || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badgeColor">Badge Color</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#8b5cf6"].map((color) => (
                      <div
                        key={color}
                        className="w-full aspect-square rounded-md cursor-pointer border-2 hover:scale-105 transition-transform"
                        style={{ backgroundColor: color, borderColor: color === "#ef4444" ? "black" : "transparent" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t bg-gray-50 p-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {editingPromotion ? "Update Promotion" : "Create Promotion"}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
