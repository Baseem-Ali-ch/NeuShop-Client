"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import ProductGallery from "@/components/organisms/product-gallery";
import ProductInfo from "@/components/organisms/product-info";
import ProductTabs from "@/components/organisms/product-tabs";
import RelatedProducts from "@/components/organisms/related-products";
import RecentlyViewed from "@/components/organisms/recently-viewed";
import type { Product } from "@/types/product";
import Navbar from "../organisms/navbar";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetail({
  product,
  relatedProducts = [],
}: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    const item = {
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
    };
    console.log("Adding to cart:", item);
    dispatch(addItem(item));
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  useEffect(() => {
    const recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    if (!recentlyViewed.includes(product.id)) {
      const newRecentlyViewed = [product.id, ...recentlyViewed].slice(0, 4);
      localStorage.setItem("recentlyViewed", JSON.stringify(newRecentlyViewed));
    }
  }, [product.id]);

  return (

  //   <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
  //   <Navbar />
  //   <main className="pt-20 pb-16">
  //     <ProductListing />
  //   </main>
  //   <Footer />
  // </div>;

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <Navbar />

      <div className="container mx-auto px-4 py-12 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery product={product} />
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
        {/* <div className="mt-20">
          <RelatedProducts products={relatedProducts} />
        </div>
        <div className="mt-20">
          <RecentlyViewed />
        </div> */}
      </div>
    </div>
  );
}
