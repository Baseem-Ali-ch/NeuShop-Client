"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/molecules/product-card"
import { cn } from "@/lib/utils"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([])

  useEffect(() => {
    // Get recently viewed product IDs from localStorage
    const recentlyViewedIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

    if (recentlyViewedIds.length > 0) {
      // Find products by ID
      const foundProducts = recentlyViewedIds.map((id: number) => products.find((p) => p.id === id)).filter(Boolean) // Remove undefined values

      setRecentProducts(foundProducts)
    }
  }, [])

  if (recentProducts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Recently Viewed</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className={cn(
              "rounded-xl overflow-hidden",
              "backdrop-blur-md bg-white/30 dark:bg-black/30",
              "border border-white/20 dark:border-gray-800/50",
              "shadow-lg p-4",
            )}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
