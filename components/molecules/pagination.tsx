"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/user/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // For large number of pages, show limited page numbers
  const visiblePages = () => {
    if (totalPages <= 5) return pages;

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), null, totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, null, ...pages.slice(totalPages - 5)];
    } else {
      return [
        1,
        null,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        null,
        totalPages,
      ];
    }
  };

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center space-x-1">
        <li>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>

        {visiblePages().map((page, index) => (
          <li key={index}>
            {page === null ? (
              <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                ...
              </span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                className={cn(
                  "min-w-[40px]",
                  currentPage === page &&
                    "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400"
                )}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )}
          </li>
        ))}

        <li>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
