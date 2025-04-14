"use client"

import { Heart, Share2, Check, Minus, Plus, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

interface ProductInfoProps {
  product: Product
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  quantity: number
  setQuantity: (quantity: number) => void
  isAddingToCart: boolean
  onAddToCart: () => void
}

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  isAddingToCart,
  onAddToCart,
}: ProductInfoProps) {
  // Calculate discount percentage
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  // Generate SKU
  const sku = `SKU-${product.id.toString().padStart(6, "0")}`

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div
      className={cn(
        "rounded-xl p-6 md:p-8",
        "backdrop-blur-md bg-white/40 dark:bg-black/40",
        "border border-white/20 dark:border-gray-800/50",
        "shadow-lg",
      )}
    >
      {/* Product Title and Badges */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white">{product.name}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
            aria-label="Share product"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4">
        {product.salePrice ? (
          <>
            <span className="text-2xl font-medium text-gray-900 dark:text-white">${product.salePrice.toFixed(2)}</span>
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">${product.price.toFixed(2)}</span>
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">
              Save {discountPercentage}%
            </span>
          </>
        ) : (
          <span className="text-2xl font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < product.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600",
              )}
            />
          ))}
        </div>
        <a href="#reviews" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
          {product.reviewCount} reviews
        </a>
        <div className="mx-2 h-4 w-px bg-gray-300 dark:bg-gray-700" />
        <div className="flex items-center">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">In stock</span>
        </div>
        <div className="mx-2 h-4 w-px bg-gray-300 dark:bg-gray-700" />
        <span className="text-sm text-gray-600 dark:text-gray-400">{sku}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-8">{product.description}</p>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                className={cn(
                  "group relative w-10 h-10 rounded-full focus:outline-none",
                  selectedColor === color ? "ring-2 ring-gray-900 dark:ring-gray-100" : "ring-1 ring-transparent",
                )}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              >
                {selectedColor === color && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={`h-5 w-5 ${
                        color === "#FFFFFF" || color === "#F5F5DC" ? "text-gray-900" : "text-white"
                      }`}
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Size</h3>
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={cn(
                  "min-w-[48px] h-10 px-3 rounded-md text-sm font-medium transition-colors",
                  "backdrop-blur-sm",
                  selectedSize === size
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "bg-white/70 text-gray-900 dark:bg-gray-800/70 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <div className="flex items-center h-12 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
          <button
            className="flex-none w-10 h-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-12 h-full text-center bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-900 dark:text-white [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            min="1"
          />
          <button
            className="flex-none w-10 h-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          className="flex-1 h-12 rounded-md bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          onClick={onAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white dark:border-gray-800 dark:border-t-gray-900" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Easy Returns</h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">30 day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
