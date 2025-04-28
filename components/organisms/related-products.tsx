"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/molecules/product-card";
import { cn } from "@/lib/user/utils";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">
          Related Products
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scrollbar-hide gap-6 pb-4",
          "scroll-smooth snap-x snap-mandatory"
        )}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              "flex-none w-[280px] snap-start",
              "rounded-xl overflow-hidden",
              "backdrop-blur-md bg-white/30 dark:bg-black/30",
              "border border-white/20 dark:border-gray-800/50",
              "shadow-lg"
            )}
          >
            <div className="p-4">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
