"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/user/utils";
import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
  selectedColor: string;
  images: string[];
}

export default function ProductGallery({
  product,
  selectedColor,
  images,
}: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg");

  // Update mainImage when images change
  useEffect(() => {
    setMainImage(images[0] || "/placeholder.svg");
  }, [images]);

  console.log("ProductGallery images:", images);
  console.log("Selected color:", selectedColor);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white dark:bg-gray-800">
        <Image
          src={mainImage}
          alt={`${product.name} in ${selectedColor === "Default" ? "default color" : selectedColor}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative w-20 h-20 rounded-md overflow-hidden",
              mainImage === image
                ? "ring-2 ring-gray-900 dark:ring-gray-100"
                : "ring-1 ring-gray-200 dark:ring-gray-700"
            )}
            onClick={() => setMainImage(image)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}