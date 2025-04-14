"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { RootState } from "@/store/store"
import { updateStoreInformation } from "@/store/slices/settingsSlice"
import SettingsCard from "@/components/molecules/admin/settings/settings-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Trash2, Plus, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const storeInfoSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  legalName: z.string().min(1, "Legal name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  aboutUs: z.string().optional(),
  termsConditions: z.string().optional(),
  privacyPolicy: z.string().optional(),
})

export default function StoreInformation() {
  const dispatch = useDispatch()
  const storeInfo = useSelector((state: RootState) => state.settings.storeInfo)
  const [logoPreview, setLogoPreview] = useState<string | null>(storeInfo?.logoUrl || null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(storeInfo?.faviconUrl || null)
  const [locations, setLocations] = useState<any[]>(storeInfo?.locations || [])

  const form = useForm<z.infer<typeof storeInfoSchema>>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: storeInfo?.storeName || "",
      legalName: storeInfo?.legalName || "",
      email: storeInfo?.email || "",
      phone: storeInfo?.phone || "",
      address: storeInfo?.address || "",
      city: storeInfo?.city || "",
      state: storeInfo?.state || "",
      postalCode: storeInfo?.postalCode || "",
      country: storeInfo?.country || "",
      facebookUrl: storeInfo?.facebookUrl || "",
      twitterUrl: storeInfo?.twitterUrl || "",
      instagramUrl: storeInfo?.instagramUrl || "",
      linkedinUrl: storeInfo?.linkedinUrl || "",
      youtubeUrl: storeInfo?.youtubeUrl || "",
      aboutUs: storeInfo?.aboutUs || "",
      termsConditions: storeInfo?.termsConditions || "",
      privacyPolicy: storeInfo?.privacyPolicy || "",
    },
  })

  const onSubmit = (data: z.infer<typeof storeInfoSchema>) => {
    dispatch(
      updateStoreInformation({
        ...data,
        logoUrl: logoPreview,
        faviconUrl: faviconPreview,
        locations,
      }),
    )
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setFaviconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        id: Date.now(),
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: "",
        email: "",
        hours: "",
      },
    ])
  }

  const updateLocation = (id: number, field: string, value: string) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)))
  }

  const removeLocation = (id: number) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

  // Watch for form changes and update Redux
  const formValues = form.watch()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Store Information</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Manage your store's basic information, branding, and legal content.
        </p>
      </div>

      <Form {...form}>
        <form onChange={() => onSubmit(form.getValues())} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="legal">Legal Content</TabsTrigger>
              <TabsTrigger value="locations">Store Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter your store's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="storeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>The name displayed to customers</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="legalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Legal Business Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Your registered business name</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormDescription>Primary contact email for customers</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>Primary contact phone number</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal/ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </SettingsCard>

              <SettingsCard className="mt-6">
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect your store to social media platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="facebookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Facebook className="h-4 w-4 mr-2" />
                            Facebook URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://facebook.com/yourstorename" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="twitterUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://twitter.com/yourstorename" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagramUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://instagram.com/yourstorename" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://linkedin.com/company/yourstorename" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="youtubeUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Youtube className="h-4 w-4 mr-2" />
                            YouTube URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://youtube.com/c/yourstorename" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </SettingsCard>
            </TabsContent>

            <TabsContent value="branding">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Store Branding</CardTitle>
                  <CardDescription>Upload your store logo and favicon</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <FormLabel>Store Logo</FormLabel>
                      <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                        {logoPreview ? (
                          <div className="relative w-full">
                            <img
                              src={logoPreview || "/placeholder.svg"}
                              alt="Store Logo"
                              className="max-h-40 mx-auto object-contain mb-4"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-0 right-0"
                              onClick={() => setLogoPreview(null)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg">
                            <div className="text-center">
                              <Upload className="h-10 w-10 mx-auto text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Click to upload logo</p>
                            </div>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                          onChange={handleLogoUpload}
                        />
                        <label htmlFor="logo-upload">
                          <Button type="button" variant="outline" className="mt-4">
                            {logoPreview ? "Change Logo" : "Upload Logo"}
                          </Button>
                        </label>
                      </div>
                      <FormDescription>Recommended size: 250x100px, PNG or SVG format</FormDescription>
                    </div>

                    <div className="space-y-4">
                      <FormLabel>Favicon</FormLabel>
                      <div className="border rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                        {faviconPreview ? (
                          <div className="relative w-full">
                            <img
                              src={faviconPreview || "/placeholder.svg"}
                              alt="Favicon"
                              className="h-16 w-16 mx-auto object-contain mb-4"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-0 right-0"
                              onClick={() => setFaviconPreview(null)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="w-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg">
                            <div className="text-center">
                              <Upload className="h-10 w-10 mx-auto text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Click to upload favicon</p>
                            </div>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="favicon-upload"
                          onChange={handleFaviconUpload}
                        />
                        <label htmlFor="favicon-upload">
                          <Button type="button" variant="outline" className="mt-4">
                            {faviconPreview ? "Change Favicon" : "Upload Favicon"}
                          </Button>
                        </label>
                      </div>
                      <FormDescription>Recommended size: 32x32px, ICO, PNG or SVG format</FormDescription>
                    </div>
                  </div>
                </CardContent>
              </SettingsCard>
            </TabsContent>

            <TabsContent value="legal">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Legal Content</CardTitle>
                  <CardDescription>Manage your store's legal content and policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="aboutUs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Us</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[150px]"
                            placeholder="Tell customers about your business..."
                          />
                        </FormControl>
                        <FormDescription>This content will be displayed on your About Us page</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Terms & Conditions</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px]"
                            placeholder="Enter your store's terms and conditions..."
                          />
                        </FormControl>
                        <FormDescription>
                          Legal terms that customers must agree to when making a purchase
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Privacy Policy</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px]"
                            placeholder="Enter your store's privacy policy..."
                          />
                        </FormControl>
                        <FormDescription>Explain how you collect, use, and protect customer data</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </SettingsCard>
            </TabsContent>

            <TabsContent value="locations">
              <SettingsCard>
                <CardHeader>
                  <CardTitle>Store Locations</CardTitle>
                  <CardDescription>Manage physical store locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {locations.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Locations Added</h3>
                      <p className="text-gray-500 mb-4">
                        Add your physical store locations to display them on your website
                      </p>
                      <Button onClick={addLocation} className="flex items-center mx-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Location
                      </Button>
                    </div>
                  ) : (
                    <>
                      {locations.map((location, index) => (
                        <Card key={location.id} className="mb-4">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg">{location.name || `Location ${index + 1}`}</CardTitle>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLocation(location.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <div>
                                  <FormLabel htmlFor={`location-${location.id}-name`}>Location Name</FormLabel>
                                  <Input
                                    id={`location-${location.id}-name`}
                                    value={location.name}
                                    onChange={(e) => updateLocation(location.id, "name", e.target.value)}
                                    placeholder="Main Store, Downtown Branch, etc."
                                  />
                                </div>

                                <div>
                                  <FormLabel htmlFor={`location-${location.id}-address`}>Street Address</FormLabel>
                                  <Input
                                    id={`location-${location.id}-address`}
                                    value={location.address}
                                    onChange={(e) => updateLocation(location.id, "address", e.target.value)}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <FormLabel htmlFor={`location-${location.id}-city`}>City</FormLabel>
                                    <Input
                                      id={`location-${location.id}-city`}
                                      value={location.city}
                                      onChange={(e) => updateLocation(location.id, "city", e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <FormLabel htmlFor={`location-${location.id}-state`}>State/Province</FormLabel>
                                    <Input
                                      id={`location-${location.id}-state`}
                                      value={location.state}
                                      onChange={(e) => updateLocation(location.id, "state", e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <FormLabel htmlFor={`location-${location.id}-postal`}>Postal/ZIP Code</FormLabel>
                                    <Input
                                      id={`location-${location.id}-postal`}
                                      value={location.postalCode}
                                      onChange={(e) => updateLocation(location.id, "postalCode", e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <FormLabel htmlFor={`location-${location.id}-country`}>Country</FormLabel>
                                    <Input
                                      id={`location-${location.id}-country`}
                                      value={location.country}
                                      onChange={(e) => updateLocation(location.id, "country", e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <FormLabel htmlFor={`location-${location.id}-phone`}>Phone</FormLabel>
                                  <Input
                                    id={`location-${location.id}-phone`}
                                    value={location.phone}
                                    onChange={(e) => updateLocation(location.id, "phone", e.target.value)}
                                  />
                                </div>

                                <div>
                                  <FormLabel htmlFor={`location-${location.id}-email`}>Email</FormLabel>
                                  <Input
                                    id={`location-${location.id}-email`}
                                    value={location.email}
                                    onChange={(e) => updateLocation(location.id, "email", e.target.value)}
                                    type="email"
                                  />
                                </div>

                                <div>
                                  <FormLabel htmlFor={`location-${location.id}-hours`}>Business Hours</FormLabel>
                                  <Textarea
                                    id={`location-${location.id}-hours`}
                                    value={location.hours}
                                    onChange={(e) => updateLocation(location.id, "hours", e.target.value)}
                                    placeholder="Mon-Fri: 9am-5pm, Sat: 10am-4pm, Sun: Closed"
                                    className="min-h-[80px]"
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button onClick={addLocation} className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Location
                      </Button>
                    </>
                  )}
                </CardContent>
              </SettingsCard>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
