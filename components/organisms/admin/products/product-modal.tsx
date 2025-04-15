"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { X, Upload, Plus, Trash2, DollarSign, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any | null;
  mode: "add" | "edit";
}

// Mock categories for the demo
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Beauty & Personal Care" },
  { id: 5, name: "Sports & Outdoors" },
];

// Mock brands for the demo
const brands = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Nike" },
  { id: 4, name: "Adidas" },
  { id: 5, name: "Sony" },
];

export default function ProductModal({
  isOpen,
  onClose,
  product,
  mode,
}: ProductModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState(
    product
      ? {
          name: product.name || "",
          description: product.description || "",
          sku: product.sku || "",
          brandId: product.brandId || "",
          categoryId: product.categoryId || "",
          tags: product.tags || [],
          price: product.price || "",
          salePrice: product.salePrice || "",
          costPerItem: product.costPerItem || "",
          taxable: product.taxable !== undefined ? product.taxable : true,
          stock: product.stock || "",
          lowStockThreshold: product.lowStockThreshold || "5",
          backorder: product.backorder || false,
          imageFiles: [], // Always initialize as empty array for new uploads
          imagePreviews: product.images || [], // Use existing images for previews
          featuredImageIndex: product.featuredImageIndex || 0,
          variants: product.variants || [],
          metaTitle: product.metaTitle || "",
          metaDescription: product.metaDescription || "",
          slug: product.slug || "",
        }
      : {
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
          imageFiles: [],
          imagePreviews: [],
          featuredImageIndex: 0,
          variants: [],
          metaTitle: "",
          metaDescription: "",
          slug: "",
        }
  );

  const [tagInput, setTagInput] = useState("");
  const [variantTypes, setVariantTypes] = useState<string[]>([]);
  const [variantOptions, setVariantOptions] = useState<{
    [key: string]: string[];
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleAddVariantType = () => {
    setVariantTypes([...variantTypes, ""]);
    setVariantOptions({
      ...variantOptions,
      ["new-type"]: [],
    });
  };

  const handleVariantTypeChange = (index: number, value: string) => {
    const newVariantTypes = [...variantTypes];
    const oldType = newVariantTypes[index];
    newVariantTypes[index] = value;

    const newVariantOptions = { ...variantOptions };
    if (oldType && newVariantOptions[oldType]) {
      newVariantOptions[value] = newVariantOptions[oldType];
      delete newVariantOptions[oldType];
    } else {
      newVariantOptions[value] = [];
    }

    setVariantTypes(newVariantTypes);
    setVariantOptions(newVariantOptions);
  };

  const handleAddVariantOption = (type: string) => {
    setVariantOptions({
      ...variantOptions,
      [type]: [...variantOptions[type], ""],
    });
  };

  const handleVariantOptionChange = (
    type: string,
    index: number,
    value: string
  ) => {
    const newOptions = [...variantOptions[type]];
    newOptions[index] = value;

    setVariantOptions({
      ...variantOptions,
      [type]: newOptions,
    });
  };

  const handleRemoveVariantOption = (type: string, index: number) => {
    setVariantOptions({
      ...variantOptions,
      [type]: variantOptions[type].filter((_, i) => i !== index),
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      const newFiles = formData.imageFiles ? [...formData.imageFiles] : [];
      const newPreviews = formData.imagePreviews
        ? [...formData.imagePreviews]
        : [];

      Array.from(e.dataTransfer.files).forEach((file) => {
        newFiles.push(file);
        const imageUrl = URL.createObjectURL(file);
        newPreviews.push(imageUrl);
      });

      setFormData({
        ...formData,
        imageFiles: newFiles,
        imagePreviews: newPreviews,
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = formData.imageFiles ? [...formData.imageFiles] : [];
      const newPreviews = formData.imagePreviews
        ? [...formData.imagePreviews]
        : [];

      Array.from(e.target.files).forEach((file) => {
        newFiles.push(file);
        const imageUrl = URL.createObjectURL(file);
        newPreviews.push(imageUrl);
      });

      setFormData({
        ...formData,
        imageFiles: newFiles,
        imagePreviews: newPreviews,
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = formData.imageFiles ? [...formData.imageFiles] : [];
    const newPreviews = formData.imagePreviews
      ? [...formData.imagePreviews]
      : [];

    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]); // Clean up object URL
    }
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    let newFeaturedIndex = formData.featuredImageIndex;
    if (index === formData.featuredImageIndex) {
      newFeaturedIndex = newPreviews.length > 0 ? 0 : -1;
    } else if (index < formData.featuredImageIndex) {
      newFeaturedIndex--;
    }

    setFormData({
      ...formData,
      imageFiles: newFiles,
      imagePreviews: newPreviews,
      featuredImageIndex: newFeaturedIndex,
    });
  };

  const handleSetFeaturedImage = (index: number) => {
    setFormData({
      ...formData,
      featuredImageIndex: index,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formDataToSend = new FormData();
  
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("brandId", formData.brandId);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
  
      if (formData.salePrice) {
        formDataToSend.append("salePrice", formData.salePrice);
      }
  
      // Append new files
      (formData.imageFiles || []).forEach((file) => {
        formDataToSend.append("images", file);
      });
  
      // If editing, include existing image URLs (to preserve them)
      if (mode === "edit" && formData.imagePreviews) {
        formDataToSend.append(
          "existingImages",
          JSON.stringify(
            formData.imagePreviews.filter((_, i) => formData.imageFiles[i] === undefined)
          )
        );
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/product`,
        {
          method: mode === "add" ? "POST" : "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
          body: formDataToSend,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }
  
      const result = await response.json();
      toast.success("Product saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = () => {
    // In a real app, you would save the product as a draft
    console.log("Saved as draft:", formData);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl glassmorphism-modal overflow-y-auto"
      >
        <SheetHeader className="space-y-2 pr-10">
          <SheetTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </SheetTitle>
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
              {/* <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger> */}
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
                      onValueChange={(value) =>
                        handleSelectChange("brandId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={brand.id.toString()}
                          >
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
                    onValueChange={(value) =>
                      handleSelectChange("categoryId", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
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
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
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
                  <CardDescription>
                    Set your product pricing and tax information.
                  </CardDescription>
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
                          onCheckedChange={(checked) =>
                            handleSwitchChange("taxable", checked)
                          }
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
                  <CardDescription>
                    Manage your product stock and inventory settings.
                  </CardDescription>
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
                      <Label htmlFor="lowStockThreshold">
                        Low stock threshold
                      </Label>
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
                        onCheckedChange={(checked) =>
                          handleSwitchChange("backorder", checked)
                        }
                      />
                      <Label htmlFor="backorder" className="cursor-pointer">
                        Allow customers to purchase this product when it's out
                        of stock
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
                    Upload and manage product images. The first image will be
                    used as the featured image.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">
                        Drag and drop images here
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse from your computer
                      </p>
                      <Button
                        variant="outline"
                        type="button"
                        className="relative"
                      >
                        <input
                          type="file"
                          name="images"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileInputChange}
                          multiple
                          accept="image/*"
                        />
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  {formData.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {formData.imagePreviews.map((image, index) => (
                        <div
                          key={index}
                          className={`relative group rounded-lg overflow-hidden border ${
                            index === formData.featuredImageIndex
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={image}
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
                            <Badge className="absolute top-2 left-2">
                              Featured
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveAsDraft}
            >
              Save as Draft
            </Button>
            <Button type="submit">
              {mode === "add" ? "Add Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
