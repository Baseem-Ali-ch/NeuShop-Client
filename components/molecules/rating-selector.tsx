"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingSelectorProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export default function RatingSelector({ value, onChange, max = 5 }: RatingSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        {[...Array(max)].map((_, i) => {
          const starValue = i + 1
          return (
            <button
              key={i}
              type="button"
              className={cn(
                "p-0.5 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-300 rounded",
                starValue <= value ? "text-amber-400" : "text-gray-300 dark:text-gray-600",
              )}
              onClick={() => onChange(starValue === value ? 0 : starValue)}
              aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            >
              <Star className={cn("h-5 w-5", starValue <= value && "fill-current")} />
            </button>
          )
        })}
        {value > 0 && (
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {value} star{value !== 1 ? "s" : ""} & up
          </span>
        )}
      </div>
    </div>
  )
}
