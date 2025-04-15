"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product?: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Return a placeholder if product is undefined
  if (!product) {
    return (
      <div className="group relative border border-gray-200 dark:border-gray-800 rounded-md p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Product data unavailable
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
            product.image || "/placeholder.svg"
          }`}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2 bg-black/5 backdrop-blur-sm transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 dark:bg-gray-900/90 dark:text-gray-100 dark:hover:bg-gray-900 dark:hover:text-white"
            aria-label="Quick view"
          >
            <Eye className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/90 text-gray-900 hover:bg-white hover:text-gray-900 dark:bg-gray-900/90 dark:text-gray-100 dark:hover:bg-gray-900 dark:hover:text-white"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Sale Badge */}
        {product.salePrice && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
            Sale
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col">
      <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold truncate hover:text-primary">{product.name}</h3>
        </Link>

        <div className="mt-1 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3 w-3",
                i < product.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  ${product.salePrice}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                ${product.price}
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
