"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  Eye,
  ImageIcon,
  LayoutGrid,
  Layers,
  MailCheck,
  Save,
  Send,
  Shuffle,
  Type,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface EmailCampaignEditorProps {
  onClose: () => void
}

export default function EmailCampaignEditor({ onClose }: EmailCampaignEditorProps) {
  const [date, setDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("details")

  const emailTemplates = [
    { id: "new-product", name: "New Product Announcement", image: "/vibrant-product-launch.png" },
    { id: "sale", name: "Sale/Promotion", image: "/sale-promotion-email.png" },
    { id: "seasonal", name: "Seasonal Template", image: "/festive-greetings.png" },
    { id: "newsletter", name: "Newsletter", image: "/modern-newsletter-layout.png" },
    { id: "custom", name: "Custom Template", image: "/blank-email-template.png" },
  ]

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle>Create Email Campaign</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-1 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="mr-1 h-4 w-4" />
            Save Draft
          </Button>
          <Button size="sm">
            <Send className="mr-1 h-4 w-4" />
            Send
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* Left sidebar */}
          <div className="border-r p-4 lg:col-span-1">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main content area */}
          <div className="p-6 lg:col-span-3">
            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Campaign Details</h3>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input id="campaign-name" placeholder="Summer Sale Announcement" />
                    </div>

                    <div>
                      <Label htmlFor="subject-line">Subject Line</Label>
                      <Input id="subject-line" placeholder="Don't miss our biggest sale of the season!" />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Recommended length: 30-50 characters for optimal open rates
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="sender-name">Sender Name</Label>
                        <Input id="sender-name" placeholder="Your Store Name" />
                      </div>
                      <div>
                        <Label htmlFor="sender-email">Sender Email</Label>
                        <Input id="sender-email" placeholder="hello@yourstore.com" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recipient Segment</h3>

                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All customers (8,742)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vip" id="vip" />
                      <Label htmlFor="vip">VIP customers (1,245)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recent" id="recent" />
                      <Label htmlFor="recent">Recent customers (2,103)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <Label htmlFor="inactive">Inactive customers (3,450)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom segment</Label>
                    </div>
                  </RadioGroup>

                  <Button variant="outline" size="sm" className="mt-2">
                    <Layers className="mr-1 h-4 w-4" />
                    Build Custom Segment
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Template</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {emailTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="cursor-pointer rounded-lg border border-muted p-2 transition-all hover:border-primary hover:shadow-sm"
                      >
                        <img
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          className="mb-2 h-[120px] w-full rounded object-cover"
                        />
                        <p className="text-center text-sm font-medium">{template.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "design" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Email Builder</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <LayoutGrid className="mr-1 h-4 w-4" />
                      Sections
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-1 h-4 w-4" />
                      Duplicate
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                  <div className="space-y-4 rounded-lg border p-4">
                    <h4 className="font-medium">Content Blocks</h4>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="text">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <Type className="mr-2 h-4 w-4" />
                            Text
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            <p className="cursor-pointer text-sm hover:text-primary">Heading</p>
                            <p className="cursor-pointer text-sm hover:text-primary">Paragraph</p>
                            <p className="cursor-pointer text-sm hover:text-primary">Quote</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="media">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Media
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            <p className="cursor-pointer text-sm hover:text-primary">Image</p>
                            <p className="cursor-pointer text-sm hover:text-primary">Divider</p>
                            <p className="cursor-pointer text-sm hover:text-primary">Spacer</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="products">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center">
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Products
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-6">
                            <p className="cursor-pointer text-sm hover:text-primary">Single Product</p>
                            <p className="cursor-pointer text-sm hover:text-primary">Product Grid</p>
                            <p className="cursor-pointer text-sm hover:text-primary">Featured Product</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="flex h-[500px] items-center justify-center rounded-lg border border-dashed">
                      <div className="text-center">
                        <p className="text-muted-foreground">Drag and drop content blocks here</p>
                        <p className="text-xs text-muted-foreground">or select a template from the gallery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">A/B Testing</h3>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Shuffle className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Enable A/B Testing</p>
                        <p className="text-sm text-muted-foreground">Test different versions to optimize performance</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-3 rounded-lg border p-4">
                    <h4 className="font-medium">Test Variables</h4>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="subject" className="rounded border-gray-300" />
                        <Label htmlFor="subject">Subject Line Testing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="content" className="rounded border-gray-300" />
                        <Label htmlFor="content">Content Variation Testing</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="time" className="rounded border-gray-300" />
                        <Label htmlFor="time">Send Time Optimization</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Schedule</h3>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label>Send Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <Calendar className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="send-time">Send Time</Label>
                        <div className="flex items-center">
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <Clock className="mr-2 h-4 w-4" />
                            10:00 AM
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select defaultValue="utc-8">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="utc+0">UTC</SelectItem>
                          <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input type="checkbox" id="send-now" className="rounded border-gray-300" />
                      <Label htmlFor="send-now">Send immediately</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Performance Tracking</h3>

                  <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Google Analytics Integration</p>
                        <p className="text-sm text-muted-foreground">Track campaign performance in Google Analytics</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="pt-2">
                      <Label htmlFor="utm-source">UTM Source</Label>
                      <Input id="utm-source" defaultValue="email_campaign" />
                    </div>

                    <div>
                      <Label htmlFor="utm-medium">UTM Medium</Label>
                      <Input id="utm-medium" defaultValue="email" />
                    </div>

                    <div>
                      <Label htmlFor="utm-campaign">UTM Campaign</Label>
                      <Input id="utm-campaign" defaultValue="summer_sale_2023" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Test Send</h3>

                  <div className="flex items-center gap-2">
                    <Input placeholder="Enter email address" />
                    <Button>
                      <MailCheck className="mr-1 h-4 w-4" />
                      Send Test
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
