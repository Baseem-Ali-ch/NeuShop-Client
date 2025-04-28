"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem, setCart } from "@/store/slices/cartSlice";
import ProductGallery from "@/components/organisms/product-gallery";
import ProductInfo from "@/components/organisms/product-info";
import ProductTabs from "@/components/organisms/product-tabs";
import RelatedProducts from "@/components/organisms/related-products";
import RecentlyViewed from "@/components/organisms/recently-viewed";
import type { Product } from "@/types/product";
import Navbar from "../organisms/navbar";
import { addToCart, fetchCart } from "@/lib/user/checkoutApi";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetail({
  product,
  relatedProducts = [],
}: ProductDetailProps) {
  const variantColors =
    product.variants
      ?.find((v) => v.type.toLowerCase() === "color")
      ?.options.map((opt) => opt.value) || [];
  const colorOptions = [
    "Default",
    ...variantColors.filter((color) => color !== "Default"),
  ];
  const sizeOptions =
    product.variants
      ?.find((v) => v.type.toLowerCase() === "size")
      ?.options.map((opt) => opt.value) || [];
  const [selectedColor, setSelectedColor] = useState(
    colorOptions[0] || "Default"
  );
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useDispatch();

  const selectedColorImages =
    selectedColor === "Default"
      ? product.images
      : product.variants
          ?.find((v) => v.type.toLowerCase() === "color")
          ?.options.find((opt) => opt.value === selectedColor)?.images ||
        product.images;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    const item = {
      id: product._id.$oid,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      quantity,
      color: selectedColor === "Default" ? undefined : selectedColor,
      size: selectedSize || undefined,
    };

    try {
      await addToCart(item, dispatch);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    const recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    const productId = product._id?.$oid;
    if (!recentlyViewed.includes(productId)) {
      const newRecentlyViewed = [productId, ...recentlyViewed].slice(0, 4);
      localStorage.setItem("recentlyViewed", JSON.stringify(newRecentlyViewed));
    }
  }, [product._id?.$oid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery
            product={product}
            selectedColor={selectedColor}
            images={selectedColorImages}
          />
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            isAddingToCart={isAddingToCart}
            onAddToCart={handleAddToCart}
          />
        </div>
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>
        <div className="mt-20">
          <RelatedProducts products={relatedProducts} />
        </div>
        <div className="mt-20">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
}
