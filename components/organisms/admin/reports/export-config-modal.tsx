"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ExportConfigModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExportConfigModal({ isOpen, onClose }: ExportConfigModalProps) {
  const [exportFormat, setExportFormat] = useState("csv")
  const [deliveryMethod, setDeliveryMethod] = useState("email")
  const [scheduleType, setScheduleType] = useState("one-time")

  const handleExport = () => {
    // In a real app, this would trigger the export process
    console.log("Exporting report...")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export Report Configuration</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="format" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Export Format</h3>
              <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 16L10 18L12 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12V18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    CSV
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12L16 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 12L8 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Excel
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf" className="flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 13H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 17H12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    PDF
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="google-sheets" id="google-sheets" />
                  <Label htmlFor="google-sheets" className="flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 13H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 17H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 9H12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Google Sheets
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Formatting Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="yyyy-mm-dd">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number-format">Number Format</Label>
                  <Select defaultValue="comma">
                    <SelectTrigger id="number-format">
                      <SelectValue placeholder="Select number format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comma">1,234.56</SelectItem>
                      <SelectItem value="dot">1.234,56</SelectItem>
                      <SelectItem value="plain">1234.56</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Data Inclusion</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-headers" defaultChecked />
                  <Label htmlFor="include-headers">Include Column Headers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-totals" defaultChecked />
                  <Label htmlFor="include-totals">Include Totals Row</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-filters" defaultChecked />
                  <Label htmlFor="include-filters">Include Applied Filters</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-charts" defaultChecked />
                  <Label htmlFor="include-charts">Include Charts (PDF only)</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Column Selection</h3>
              <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-date" defaultChecked />
                    <Label htmlFor="col-date">Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-gross-sales" defaultChecked />
                    <Label htmlFor="col-gross-sales">Gross Sales</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-net-sales" defaultChecked />
                    <Label htmlFor="col-net-sales">Net Sales</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-orders" defaultChecked />
                    <Label htmlFor="col-orders">Orders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-avg-order" defaultChecked />
                    <Label htmlFor="col-avg-order">Average Order Value</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-tax" defaultChecked />
                    <Label htmlFor="col-tax">Tax</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="col-shipping" defaultChecked />
                    <Label htmlFor="col-shipping">Shipping</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Header & Footer (PDF only)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="header-text">Header Text</Label>
                  <Input id="header-text" placeholder="Sales Report" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Input id="footer-text" placeholder="Confidential" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Delivery Method</h3>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="download" id="download" />
                  <Label htmlFor="download">Direct Download</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="cloud" id="cloud" />
                  <Label htmlFor="cloud">Cloud Storage (Google Drive, Dropbox)</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="api" id="api" />
                  <Label htmlFor="api">API Endpoint</Label>
                </div>
              </RadioGroup>
            </div>

            {deliveryMethod === "email" && (
              <div className="space-y-2">
                <Label htmlFor="email-recipients">Email Recipients</Label>
                <Textarea
                  id="email-recipients"
                  placeholder="Enter email addresses (one per line or comma-separated)"
                  className="min-h-[100px]"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox id="email-self" defaultChecked />
                  <Label htmlFor="email-self">Send a copy to myself</Label>
                </div>
              </div>
            )}

            {deliveryMethod === "cloud" && (
              <div className="space-y-2">
                <Label htmlFor="cloud-service">Cloud Service</Label>
                <Select defaultValue="google-drive">
                  <SelectTrigger id="cloud-service">
                    <SelectValue placeholder="Select cloud service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-drive">Google Drive</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                    <SelectItem value="onedrive">OneDrive</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <Button variant="outline" className="w-full">
                    Connect Account
                  </Button>
                </div>
              </div>
            )}

            {deliveryMethod === "api" && (
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint URL</Label>
                <Input id="api-endpoint" placeholder="https://api.example.com/webhook" />
                <div className="mt-2">
                  <Label htmlFor="api-key">API Key (optional)</Label>
                  <Input id="api-key" placeholder="Enter API key" />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Schedule Type</h3>
              <RadioGroup value={scheduleType} onValueChange={setScheduleType} className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time">One-time Export (Immediate)</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>

            {scheduleType !== "one-time" && (
              <div className="space-y-4">
                {scheduleType === "weekly" && (
                  <div className="space-y-2">
                    <Label>Day of Week</Label>
                    <Select defaultValue="monday">
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {scheduleType === "monthly" && (
                  <div className="space-y-2">
                    <Label>Day of Month</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(28)].map((_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                        <SelectItem value="last">Last day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Time of Day</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select defaultValue="00">
                      <SelectTrigger>
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(24)].map((_, i) => (
                          <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="00">
                      <SelectTrigger>
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 15, 30, 45].map((i) => (
                          <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport}>{scheduleType === "one-time" ? "Export Now" : "Schedule Export"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
