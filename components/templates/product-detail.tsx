"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/store/slices/cartSlice"
import ProductGallery from "@/components/organisms/product-gallery"
import ProductInfo from "@/components/organisms/product-info"
import ProductTabs from "@/components/organisms/product-tabs"
import RelatedProducts from "@/components/organisms/related-products"
import RecentlyViewed from "@/components/organisms/recently-viewed"
import type { Product } from "@/types/product"
import { products } from "@/data/products"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const dispatch = useDispatch()

  // Get related products (same category)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  // Handle add to cart
  const handleAddToCart = () => {
    setIsAddingToCart(true)

    // Simulate API call
    setTimeout(() => {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.salePrice || product.price,
          image: product.image,
          quantity,
          color: selectedColor,
          size: selectedSize,
        }),
      )
      setIsAddingToCart(false)
    }, 1000)
  }

  // Save to recently viewed
  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

    // Add current product to recently viewed if not already there
    if (!recentlyViewed.includes(product.id)) {
      const newRecentlyViewed = [product.id, ...recentlyViewed].slice(0, 4)
      localStorage.setItem("recentlyViewed", JSON.stringify(newRecentlyViewed))
    }
  }, [product.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <ProductGallery product={product} />

          {/* Product Info */}
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

        {/* Product Tabs */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <RelatedProducts products={relatedProducts} />
        </div>

        {/* Recently Viewed */}
        <div className="mt-20">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  )
}
