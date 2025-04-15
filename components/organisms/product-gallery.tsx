"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";
import type { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Generate gallery images (main image + variations)
  const galleryImages = [
    product.image[0] || "/placeholder.svg",
    ...Array(3)
      .fill(null)
      .map(
        (_, i) =>
          `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(
            product.name
          )}+variation+${i + 1}`
      ),
  ];

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
  };

  // Handle next/prev navigation
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
    setIsZoomed(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
    setIsZoomed(false);
  };

  // Handle zoom functionality
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !mainImageRef.current) return;

    const { left, top, width, height } =
      mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Touch swipe functionality for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      // Swipe left, go to next
      handleNext();
    } else if (diff < -50) {
      // Swipe right, go to prev
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        ref={mainImageRef}
        className={cn(
          "relative aspect-square overflow-hidden rounded-xl",
          "bg-white dark:bg-gray-800",
          "backdrop-blur-md bg-white/30 dark:bg-black/30",
          "border border-white/20 dark:border-gray-800/50",
          "shadow-lg",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
            product.image || "/placeholder.svg"
          }`}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isZoomed ? "scale-150" : "scale-100"
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />

        {/* Navigation Arrows */}
        {!isZoomed && !isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Zoom indicator */}
        {!isMobile && (
          <div className="absolute bottom-3 right-3 p-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <ZoomIn className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </div>
        )}

        {/* Mobile indicator dots */}
        {isMobile && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {galleryImages.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  index === activeIndex
                    ? "bg-white dark:bg-gray-200"
                    : "bg-white/50 dark:bg-gray-500/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:grid grid-cols-4 gap-2">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg",
              "bg-white dark:bg-gray-800",
              "backdrop-blur-md bg-white/30 dark:bg-black/30",
              "border",
              index === activeIndex
                ? "border-gray-900 dark:border-gray-300"
                : "border-white/20 dark:border-gray-800/50",
              "hover:border-gray-900 dark:hover:border-gray-300",
              "transition-all duration-200"
            )}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
                product.image || "/placeholder.svg"
              }`}
              alt={`${product.name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
