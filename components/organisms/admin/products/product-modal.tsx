"use client";

import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";
import Image from "next/image";
import { addProduct, updateProduct } from "@/lib/admin/productApi";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any | null;
  mode: "add" | "edit";
}

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Kitchen" },
  { id: 4, name: "Beauty & Personal Care" },
  { id: 5, name: "Sports & Outdoors" },
];

const brands = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Nike" },
  { id: 4, name: "Adidas" },
  { id: 5, name: "Sony" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

interface VariantOption {
  value: string;
  images?: string[];
}

interface Variant {
  type: string;
  options: VariantOption[];
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  mode,
}: ProductModalProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    sku: product?.sku || "",
    brandId: product?.brandId || "",
    categoryId: product?.categoryId || "",
    tags: product?.tags || [],
    price: product?.price || "",
    salePrice: product?.salePrice || "",
    stock: product?.stock || "",
    lowStockThreshold: product?.lowStockThreshold || "5",
    images: product?.images || [],
    variants: product?.variants || [],
  });
  const [tagInput, setTagInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [variantImages, setVariantImages] = useState<{ [key: string]: File[] }>(
    {}
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleAddVariant = (type: string) => {
    const newVariant = { type, options: [] };
    setFormData({
      ...formData,
      variants: [...formData.variants, newVariant],
    });
  };

  const handleVariantTypeChange = (variantIndex: number, value: string) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].type = value;
    if (value !== "Color") {
      // Clear images for non-color variants
      newVariants[variantIndex].options = newVariants[variantIndex].options.map(
        (opt) => ({
          value: opt.value,
        })
      );
      setVariantImages((prev) => {
        const newImages = { ...prev };
        Object.keys(newImages).forEach((key) => {
          if (key.startsWith(`${variantIndex}-`)) {
            delete newImages[key];
          }
        });
        return newImages;
      });
    }
    setFormData({ ...formData, variants: newVariants });
  };

  const handleAddVariantOption = (variantIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].options.push({ value: "" });
    setFormData({ ...formData, variants: newVariants });
  };

  const handleVariantOptionChange = (
    variantIndex: number,
    optionIndex: number,
    value: string,
    isSelect: boolean = false
  ) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].options[optionIndex].value = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const handleRemoveVariantOption = (
    variantIndex: number,
    optionIndex: number
  ) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, variants: newVariants });
    setVariantImages((prev) => {
      const newImages = { ...prev };
      delete newImages[`${variantIndex}-${optionIndex}`];
      return newImages;
    });
  };

  const handleRemoveVariant = (variantIndex: number) => {
    const newVariants = formData.variants.filter(
      (_, index) => index !== variantIndex
    );
    setFormData({ ...formData, variants: newVariants });
    setVariantImages((prev) => {
      const newImages = { ...prev };
      Object.keys(newImages).forEach((key) => {
        if (key.startsWith(`${variantIndex}-`)) {
          delete newImages[key];
        }
      });
      return newImages;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    variantIndex?: number,
    optionIndex?: number
  ) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files, variantIndex, optionIndex);
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantIndex?: number,
    optionIndex?: number
  ) => {
    if (e.target.files) {
      handleFiles(e.target.files, variantIndex, optionIndex);
    }
  };

  const handleFiles = (
    files: FileList,
    variantIndex?: number,
    optionIndex?: number
  ) => {
    const maxImages = 4;
    const currentCount =
      variantIndex !== undefined && optionIndex !== undefined
        ? variantImages[`${variantIndex}-${optionIndex}`]?.length || 0
        : imageFiles.length;
    const newFiles = Array.from(files).slice(0, maxImages - currentCount);

    if (variantIndex !== undefined && optionIndex !== undefined) {
      const key = `${variantIndex}-${optionIndex}`;
      setVariantImages({
        ...variantImages,
        [key]: [...(variantImages[key] || []), ...newFiles],
      });
    } else {
      setImageFiles([...imageFiles, ...newFiles].slice(0, maxImages));
    }
  };

  const handleRemoveImage = (
    index: number,
    variantIndex?: number,
    optionIndex?: number
  ) => {
    if (variantIndex !== undefined && optionIndex !== undefined) {
      const key = `${variantIndex}-${optionIndex}`;
      const newVariantImages = [...(variantImages[key] || [])];
      newVariantImages.splice(index, 1);
      setVariantImages({ ...variantImages, [key]: newVariantImages });
    } else {
      const newFiles = [...imageFiles];
      newFiles.splice(index, 1);
      setImageFiles(newFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "variants") {
          formDataObj.append(key, value as string);
        }
      });

      if (formData.variants && Array.isArray(formData.variants)) {
        formDataObj.append("variants", JSON.stringify(formData.variants));
      }

      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file, index) => {
          formDataObj.append("productImages", file);
        });
      }

      if (variantImages && Object.keys(variantImages).length > 0) {
        Object.entries(variantImages).forEach(([variantId, files]) => {
          files.forEach((file, index) => {
            formDataObj.append(`variantImages_${variantId}-${index}`, file);
          });
        });
      }

      if (mode === "add") {
        await addProduct(formDataObj);
        toast.success("Product added successfully!");
        window.location.reload()
      } else if (mode === "edit" && product?.id) {
        await updateProduct(product.id, formDataObj);
        toast.success("Product updated successfully!");
      }

      onClose();
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast.error(
        error.message || "An error occurred while saving the product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </SheetTitle>
          <SheetDescription>
            {mode === "add"
              ? "Add a new product to your store."
              : "Edit product details."}
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
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandId">Brand</Label>
                  <Select
                    value={formData.brandId}
                    onValueChange={(value) =>
                      handleSelectChange("brandId", value)
                    }
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
                  value={formData.categoryId}
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
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1"
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
                />
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Regular Price <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">Sale Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          id="salePrice"
                          name="salePrice"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.salePrice}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Quantity in stock</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          min="0"
                          value={formData.stock}
                          onChange={handleInputChange}
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
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images (Max 4)</CardTitle>
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
                      <Button
                        variant="outline"
                        type="button"
                        className="relative mt-2"
                      >
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileInputChange}
                          multiple
                          accept="image/*"
                          disabled={imageFiles.length >= 4}
                        />
                        Browse Files
                      </Button>
                    </div>
                  </div>
                  {imageFiles.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imageFiles.map((file, index) => (
                        <div
                          key={index}
                          className="relative group rounded-lg overflow-hidden border"
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
                    Add up to two variant types: Color (with images) or Size
                    (select from list).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    {!formData.variants.some(
                      (v: Variant) => v.type === "Color"
                    ) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddVariant("Color")}
                        disabled={formData.variants.length >= 2}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Color Variant
                      </Button>
                    )}
                    {!formData.variants.some(
                      (v: Variant) => v.type === "Size"
                    ) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleAddVariant("Size")}
                        disabled={formData.variants.length >= 2}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Size Variant
                      </Button>
                    )}
                  </div>
                  {formData.variants.length === 0 ? (
                    <div className="text-center py-8 border border-dashed rounded-lg">
                      <p className="text-muted-foreground">
                        No variants added. Add Color or Size variants above.
                      </p>
                    </div>
                  ) : (
                    formData.variants.map(
                      (variant: Variant, variantIndex: number) => (
                        <div
                          key={variantIndex}
                          className="border rounded-lg p-4 relative"
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemoveVariant(variantIndex)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="space-y-2 mb-4">
                            <Label>Variant Type</Label>
                            <Select
                              value={variant.type}
                              onValueChange={(value) =>
                                handleVariantTypeChange(variantIndex, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select variant type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Color">Color</SelectItem>
                                <SelectItem value="Size">Size</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-medium">Options</h4>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleAddVariantOption(variantIndex)
                              }
                              disabled={
                                variant.type === "Color" &&
                                variant.options.length >= 4
                              }
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add Option
                            </Button>
                          </div>
                          {variant.options.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No options added yet.
                            </p>
                          ) : (
                            variant.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="space-y-2 mb-4">
                                <div className="flex items-center gap-2">
                                  {variant.type === "Color" ? (
                                    <Input
                                      value={option.value}
                                      onChange={(e) =>
                                        handleVariantOptionChange(
                                          variantIndex,
                                          optionIndex,
                                          e.target.value
                                        )
                                      }
                                      placeholder="e.g. Red, Blue"
                                    />
                                  ) : (
                                    <Select
                                      value={option.value}
                                      onValueChange={(value) =>
                                        handleVariantOptionChange(
                                          variantIndex,
                                          optionIndex,
                                          value,
                                          true
                                        )
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select size" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {sizeOptions.map((size) => (
                                          <SelectItem key={size} value={size}>
                                            {size}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  )}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleRemoveVariantOption(
                                        variantIndex,
                                        optionIndex
                                      )
                                    }
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                {variant.type === "Color" && (
                                  <>
                                    <div
                                      className={`border-2 border-dashed rounded-lg p-4 ${
                                        isDragging
                                          ? "border-primary bg-primary/5"
                                          : "border-border"
                                      }`}
                                      onDragOver={handleDragOver}
                                      onDragLeave={handleDragLeave}
                                      onDrop={(e) =>
                                        handleDrop(e, variantIndex, optionIndex)
                                      }
                                    >
                                      <div className="flex flex-col items-center">
                                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm">
                                          Color Images (Max 4)
                                        </p>
                                        <Button
                                          variant="outline"
                                          type="button"
                                          className="relative mt-2"
                                        >
                                          <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={(e) =>
                                              handleFileInputChange(
                                                e,
                                                variantIndex,
                                                optionIndex
                                              )
                                            }
                                            multiple
                                            accept="image/*"
                                            disabled={
                                              (variantImages[
                                                `${variantIndex}-${optionIndex}`
                                              ]?.length || 0) >= 4
                                            }
                                          />
                                          Browse Files
                                        </Button>
                                      </div>
                                    </div>
                                    {variantImages[
                                      `${variantIndex}-${optionIndex}`
                                    ]?.length > 0 && (
                                      <div className="grid grid-cols-2 gap-2 mt-2">
                                        {variantImages[
                                          `${variantIndex}-${optionIndex}`
                                        ].map((file, index) => (
                                          <div
                                            key={index}
                                            className="relative group rounded-lg overflow-hidden border"
                                          >
                                            <div className="relative aspect-square">
                                              <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`Variant image ${
                                                  index + 1
                                                }`}
                                                fill
                                                className="object-cover"
                                              />
                                            </div>
                                            <Button
                                              type="button"
                                              variant="destructive"
                                              size="icon"
                                              className="absolute top-1 right-1"
                                              onClick={() =>
                                                handleRemoveImage(
                                                  index,
                                                  variantIndex,
                                                  optionIndex
                                                )
                                              }
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "add"
                ? "Add Product"
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
