"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, Upload, Plus, Trash2, DollarSign, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: any | null
  mode: "add" | "edit"
}

// Mock categories for the demo
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Beauty & Personal Care" },
  { id: 5, name: "Sports & Outdoors" },
]

// Mock brands for the demo
const brands = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Nike" },
  { id: 4, name: "Adidas" },
  { id: 5, name: "Sony" },
]

export default function ProductModal({ isOpen, onClose, product, mode }: ProductModalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState(
    product || {
      name: "",
      description: "",
      sku: "",
      brandId: "",
      categoryId: "",
      tags: [],
      price: "",
      salePrice: "",
      costPerItem: "",
      taxable: true,
      stock: "",
      lowStockThreshold: "5",
      backorder: false,
      images: [],
      featuredImageIndex: 0,
      variants: [],
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
  )

  const [tagInput, setTagInput] = useState("")
  const [variantTypes, setVariantTypes] = useState<string[]>([])
  const [variantOptions, setVariantOptions] = useState<{ [key: string]: string[] }>({})
  const [isDragging, setIsDragging] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        })
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const handleAddVariantType = () => {
    setVariantTypes([...variantTypes, ""])
    setVariantOptions({
      ...variantOptions,
      ["new-type"]: [],
    })
  }

  const handleVariantTypeChange = (index: number, value: string) => {
    const newVariantTypes = [...variantTypes]
    const oldType = newVariantTypes[index]
    newVariantTypes[index] = value

    const newVariantOptions = { ...variantOptions }
    if (oldType && newVariantOptions[oldType]) {
      newVariantOptions[value] = newVariantOptions[oldType]
      delete newVariantOptions[oldType]
    } else {
      newVariantOptions[value] = []
    }

    setVariantTypes(newVariantTypes)
    setVariantOptions(newVariantOptions)
  }

  const handleAddVariantOption = (type: string) => {
    setVariantOptions({
      ...variantOptions,
      [type]: [...variantOptions[type], ""],
    })
  }

  const handleVariantOptionChange = (type: string, index: number, value: string) => {
    const newOptions = [...variantOptions[type]]
    newOptions[index] = value

    setVariantOptions({
      ...variantOptions,
      [type]: newOptions,
    })
  }

  const handleRemoveVariantOption = (type: string, index: number) => {
    setVariantOptions({
      ...variantOptions,
      [type]: variantOptions[type].filter((_, i) => i !== index),
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    // In a real app, you would handle file uploads here
    // For this demo, we'll just add a placeholder image
    if (e.dataTransfer.files.length > 0) {
      const newImages = [...formData.images]

      Array.from(e.dataTransfer.files).forEach(() => {
        newImages.push("/assorted-products-display.png")
      })

      setFormData({
        ...formData,
        images: newImages,
      })
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would handle file uploads here
    // For this demo, we'll just add a placeholder image
    if (e.target.files && e.target.files.length > 0) {
      const newImages = [...formData.images]

      Array.from(e.target.files).forEach(() => {
        newImages.push("/assorted-products-display.png")
      })

      setFormData({
        ...formData,
        images: newImages,
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)

    let newFeaturedIndex = formData.featuredImageIndex
    if (index === formData.featuredImageIndex) {
      newFeaturedIndex = newImages.length > 0 ? 0 : -1
    } else if (index < formData.featuredImageIndex) {
      newFeaturedIndex--
    }

    setFormData({
      ...formData,
      images: newImages,
      featuredImageIndex: newFeaturedIndex,
    })
  }

  const handleSetFeaturedImage = (index: number) => {
    setFormData({
      ...formData,
      featuredImageIndex: index,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Form submitted:", formData)
    onClose()
  }

  const handleSaveAsDraft = () => {
    // In a real app, you would save the product as a draft
    console.log("Saved as draft:", formData)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl glassmorphism-modal overflow-y-auto"
      >
        <SheetHeader className="space-y-2 pr-10">
          <SheetTitle>{mode === "add" ? "Add New Product" : "Edit Product"}</SheetTitle>
          <SheetDescription>
            {mode === "add"
              ? "Add a new product to your store. Fill in the details below."
              : "Edit product details and click save when you're done."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">
                      SKU/ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="Enter product SKU"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandId">Brand</Label>
                    <Select
                      value={formData.brandId.toString()}
                      onValueChange={(value) => handleSelectChange("brandId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id.toString()}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.categoryId.toString()}
                    onValueChange={(value) => handleSelectChange("categoryId", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Type a tag and press Enter"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Information</CardTitle>
                  <CardDescription>Set your product pricing and tax information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Regular Price <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salePrice">Sale Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="salePrice"
                          name="salePrice"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.salePrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="costPerItem">Cost per item</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="costPerItem"
                          name="costPerItem"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.costPerItem}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxable" className="block mb-2">
                        Tax Settings
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="taxable"
                          checked={formData.taxable}
                          onCheckedChange={(checked) => handleSwitchChange("taxable", checked)}
                        />
                        <Label htmlFor="taxable" className="cursor-pointer">
                          This product is taxable
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Manage your product stock and inventory settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Quantity in stock</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleInputChange}
                          placeholder="0"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lowStockThreshold">Low stock threshold</Label>
                      <Input
                        id="lowStockThreshold"
                        name="lowStockThreshold"
                        type="number"
                        min="0"
                        value={formData.lowStockThreshold}
                        onChange={handleInputChange}
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backorder" className="block mb-2">
                      Backorder
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="backorder"
                        checked={formData.backorder}
                        onCheckedChange={(checked) => handleSwitchChange("backorder", checked)}
                      />
                      <Label htmlFor="backorder" className="cursor-pointer">
                        Allow customers to purchase this product when it's out of stock
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload and manage product images. The first image will be used as the featured image.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      isDragging ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Drag and drop images here</h3>
                      <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
                      <Button variant="outline" type="button" className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileInputChange}
                          multiple
                          accept="image/*"
                        />
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div
                          key={index}
                          className={`relative group rounded-lg overflow-hidden border ${
                            index === formData.featuredImageIndex ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            {index !== formData.featuredImageIndex && (
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => handleSetFeaturedImage(index)}
                                className="h-8"
                              >
                                Set as Featured
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveImage(index)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {index === formData.featuredImageIndex && (
                            <Badge className="absolute top-2 left-2">Featured</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Variants</CardTitle>
                  <CardDescription>
                    Create variations of your product such as different sizes, colors, or materials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Variant Types</h3>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddVariantType} className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Add Variant Type
                      </Button>
                    </div>

                    {variantTypes.length === 0 ? (
                      <div className="text-center py-8 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">
                          No variant types added yet. Add a variant type like Size, Color, or Material.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {variantTypes.map((type, typeIndex) => (
                          <div key={typeIndex} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex-1 mr-4">
                                <Label htmlFor={`variant-type-${typeIndex}`} className="mb-1 block">
                                  Variant Type
                                </Label>
                                <Input
                                  id={`variant-type-${typeIndex}`}
                                  value={type}
                                  onChange={(e) => handleVariantTypeChange(typeIndex, e.target.value)}
                                  placeholder="e.g. Size, Color, Material"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddVariantOption(type)}
                                className="h-8"
                                disabled={!type}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add Option
                              </Button>
                            </div>

                            {variantOptions[type]?.length > 0 ? (
                              <div className="space-y-2">
                                {variantOptions[type].map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center gap-2">
                                    <Input
                                      value={option}
                                      onChange={(e) => handleVariantOptionChange(type, optionIndex, e.target.value)}
                                      placeholder={`e.g. ${
                                        type === "Size"
                                          ? "Small, Medium, Large"
                                          : type === "Color"
                                            ? "Red, Blue, Green"
                                            : "Option value"
                                      }`}
                                      className="flex-1"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveVariantOption(type, optionIndex)}
                                      className="h-8 w-8"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No options added yet. Add options for this variant type.
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your product for search engines.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      placeholder="Enter meta title"
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.metaTitle.length} / 60 characters recommended
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      placeholder="Enter meta description"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.metaDescription.length} / 160 characters recommended
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        yourstore.com/products/
                      </div>
                      <Input
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        placeholder="product-url-slug"
                        className="pl-[180px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="secondary" onClick={handleSaveAsDraft}>
              Save as Draft
            </Button>
            <Button type="submit">{mode === "add" ? "Add Product" : "Save Changes"}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
