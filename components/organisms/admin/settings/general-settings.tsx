"use client"
import { useDispatch, useSelector } from "react-redux"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { RootState } from "@/store/store"
import { updateGeneralSettings } from "@/store/slices/settingsSlice"
import SettingsCard from "@/components/molecules/admin/settings/settings-card"

const generalSettingsSchema = z.object({
  storeStatus: z.boolean(),
  maintenanceMessage: z.string().optional(),
  guestCheckout: z.boolean(),
  accountCreation: z.enum(["optional", "required", "disabled"]),
  passwordMinLength: z.number().min(6).max(32),
  passwordRequireSpecial: z.boolean(),
  lowStockThreshold: z.number().min(1),
  outOfStockBehavior: z.enum(["hide", "show_unavailable", "allow_backorders"]),
  backorderLimit: z.number().min(0),
  orderNumberPrefix: z.string(),
  orderNumberSuffix: z.string().optional(),
  invoiceNumberPrefix: z.string(),
  metaTitleTemplate: z.string(),
  metaDescriptionTemplate: z.string(),
  robotsTxt: z.string(),
})

export default function GeneralSettings() {
  const dispatch = useDispatch()
  const generalSettings = useSelector((state: RootState) => state.settings.general)

  const form = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      storeStatus: generalSettings?.storeStatus || true,
      maintenanceMessage:
        generalSettings?.maintenanceMessage ||
        "We're currently updating our store to serve you better. Please check back soon!",
      guestCheckout: generalSettings?.guestCheckout || true,
      accountCreation: generalSettings?.accountCreation || "optional",
      passwordMinLength: generalSettings?.passwordMinLength || 8,
      passwordRequireSpecial: generalSettings?.passwordRequireSpecial || true,
      lowStockThreshold: generalSettings?.lowStockThreshold || 5,
      outOfStockBehavior: generalSettings?.outOfStockBehavior || "show_unavailable",
      backorderLimit: generalSettings?.backorderLimit || 10,
      orderNumberPrefix: generalSettings?.orderNumberPrefix || "ORD-",
      orderNumberSuffix: generalSettings?.orderNumberSuffix || "",
      invoiceNumberPrefix: generalSettings?.invoiceNumberPrefix || "INV-",
      metaTitleTemplate: generalSettings?.metaTitleTemplate || "{product_name} | {store_name}",
      metaDescriptionTemplate:
        generalSettings?.metaDescriptionTemplate || "{product_short_description} - Shop now at {store_name}",
      robotsTxt:
        generalSettings?.robotsTxt || "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nDisallow: /cart",
    },
  })

  const onSubmit = (data: z.infer<typeof generalSettingsSchema>) => {
    dispatch(updateGeneralSettings(data))
  }

  // Watch for form changes and update Redux
  const formValues = form.watch()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">General Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Configure the basic settings for your store, including store status, customer accounts, inventory, and SEO.
        </p>
      </div>

      <Form {...form}>
        <form onChange={() => onSubmit(form.getValues())} className="space-y-8">
          <Tabs defaultValue="store" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="store">Store Status</TabsTrigger>
              <TabsTrigger value="accounts">Customer Accounts</TabsTrigger>
              <TabsTrigger value="inventory">Inventory & Orders</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="store">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Store Status</CardTitle>
                  <CardDescription>Control whether your store is online or in maintenance mode</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="storeStatus"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Store Status</FormLabel>
                          <FormDescription>
                            {field.value
                              ? "Your store is online and accessible to customers"
                              : "Your store is in maintenance mode"}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maintenanceMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maintenance Mode Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the message to display during maintenance mode"
                            className="resize-y min-h-[100px]"
                            {...field}
                            disabled={form.watch("storeStatus")}
                          />
                        </FormControl>
                        <FormDescription>
                          This message will be displayed to visitors when your store is in maintenance mode.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </SettingsCard>
            </TabsContent>

            <TabsContent value="accounts">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Customer Account Settings</CardTitle>
                  <CardDescription>Configure how customers can create accounts and checkout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="guestCheckout"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Guest Checkout</FormLabel>
                          <FormDescription>Allow customers to check out without creating an account</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountCreation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Creation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account creation policy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="optional">Optional (Recommended)</SelectItem>
                            <SelectItem value="required">Required for Checkout</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Determine how customer accounts are created in your store</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h4 className="font-medium">Password Policy</h4>

                    <FormField
                      control={form.control}
                      name="passwordMinLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Password Length: {field.value} characters</FormLabel>
                          <FormControl>
                            <Slider
                              min={6}
                              max={32}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Set the minimum number of characters required for customer passwords
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passwordRequireSpecial"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Require Special Characters</FormLabel>
                            <FormDescription>Require at least one special character in passwords</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </SettingsCard>
            </TabsContent>

            <TabsContent value="inventory">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Inventory Settings</CardTitle>
                  <CardDescription>Configure how inventory is managed in your store</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="lowStockThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low Stock Threshold: {field.value} items</FormLabel>
                        <FormControl>
                          <Slider
                            min={1}
                            max={20}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Products with stock below this threshold will be marked as "Low Stock"
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="outOfStockBehavior"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Out of Stock Behavior</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select behavior for out of stock products" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hide">Hide Products</SelectItem>
                            <SelectItem value="show_unavailable">Show as Unavailable</SelectItem>
                            <SelectItem value="allow_backorders">Allow Backorders</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Determine how out of stock products are displayed and handled</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("outOfStockBehavior") === "allow_backorders" && (
                    <FormField
                      control={form.control}
                      name="backorderLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Backorder Limit: {field.value} items</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={50}
                              step={5}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum number of items that can be backordered per product (0 = unlimited)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </SettingsCard>

              <SettingsCard className="mt-6">
                <CardHeader>
                  <CardTitle>Order Settings</CardTitle>
                  <CardDescription>Configure order numbering and invoice formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="orderNumberPrefix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Number Prefix</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Prefix added to all order numbers (e.g., ORD-)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="orderNumberSuffix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Number Suffix</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Optional suffix for order numbers</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="invoiceNumberPrefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number Prefix</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>Prefix added to all invoice numbers (e.g., INV-)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </SettingsCard>
            </TabsContent>

            <TabsContent value="seo">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Configure search engine optimization settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="metaTitleTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title Template</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Template for page titles. Available variables: {"{product_name}"}, {"{category_name}"},{" "}
                          {"{store_name}"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescriptionTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description Template</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="resize-y min-h-[80px]" />
                        </FormControl>
                        <FormDescription>
                          Template for meta descriptions. Available variables: {"{product_short_description}"},{" "}
                          {"{store_name}"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="robotsTxt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Robots.txt Content</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="resize-y min-h-[150px] font-mono text-sm" />
                        </FormControl>
                        <FormDescription>
                          Content for your robots.txt file that controls search engine crawling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </SettingsCard>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
