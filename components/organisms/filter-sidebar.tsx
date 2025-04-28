"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/user/utils";
import RatingSelector from "@/components/molecules/rating-selector";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "mt-4 space-y-4 overflow-hidden transition-all",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const categories = [
    { id: "clothing", label: "Clothing" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
    { id: "bags", label: "Bags" },
    { id: "jewelry", label: "Jewelry" },
  ];

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ];

  const colors = [
    { id: "black", label: "Black", value: "#000000" },
    { id: "white", label: "White", value: "#ffffff" },
    { id: "gray", label: "Gray", value: "#808080" },
    { id: "beige", label: "Beige", value: "#f5f5dc" },
    { id: "navy", label: "Navy", value: "#000080" },
  ];

  return (
    <div className="space-y-1">
      <FilterSection title="Price Range">
        <div className="px-1">
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ${priceRange[0]}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Categories">
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox id={`category-${category.id}`} />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <RatingSelector value={selectedRating} onChange={setSelectedRating} />
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              className="min-w-[40px] h-10 px-3 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium hover:border-gray-900 dark:hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-300 transition-colors"
            >
              {size.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              className="group relative w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-300"
              style={{ backgroundColor: color.value }}
              aria-label={color.label}
            >
              <span className="absolute inset-0 rounded-full border border-gray-200 dark:border-gray-700 group-hover:border-gray-900 dark:group-hover:border-gray-300 transition-colors"></span>
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="pt-4">
        <button className="w-full py-2 px-4 border border-gray-900 dark:border-gray-300 rounded-md text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-colors">
          Apply Filters
        </button>
        <button className="w-full mt-2 py-2 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Reset All
        </button>
      </div>
    </div>
  );
}
