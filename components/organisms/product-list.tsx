import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

interface ProductListProps {
  products: Product[]
  isLoading?: boolean
}

function ProductListItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-md">
      <Skeleton className="aspect-square w-full sm:w-40 rounded-md" />
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
        </div>
        <div className="flex justify-between items-end">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default function ProductList({ products, isLoading = false }: ProductListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <ProductListItemSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="group flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-900 dark:hover:border-gray-300 transition-colors"
        >
          {/* Product Image */}
          <div className="relative aspect-square w-full sm:w-40 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Sale Badge */}
            {product.salePrice && (
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">Sale</div>
            )}
          </div>

          {/*  Product Info */}
          <div className="flex-1 flex flex-col">
            <Link href={`/products/${product.id}`} className="group-hover:underline">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
            </Link>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>

            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < product.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600",
                  )}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
            </div>

            <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-lg font-medium text-gray-900 dark:text-gray-100">${product.salePrice}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">${product.price}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Add to wishlist">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button className="rounded-full">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
