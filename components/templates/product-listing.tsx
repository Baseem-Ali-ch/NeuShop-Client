"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { FilterIcon, GridIcon, ListIcon, X } from "lucide-react";
import FilterSidebar from "@/components/organisms/filter-sidebar";
import ProductGrid from "@/components/organisms/product-grid";
import ProductList from "@/components/organisms/product-list";
import SortDropdown from "@/components/molecules/sort-dropdown";
import Pagination from "@/components/molecules/pagination";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { cn } from "@/lib/user/utils";

export type ViewMode = "grid" | "list";
export type SortOption = "newest" | "price-low" | "price-high" | "popular";

export default function ProductListing() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const isMobile = useMediaQuery("(max-width: 1024px)");
  const productsPerPage = 12;

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle sorting
  useEffect(() => {
    let sorted = [...products];

    switch (sortOption) {
      case "newest":
        sorted = sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "price-low":
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(sorted);
  }, [sortOption]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-gray-100">
            Collection
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Discover our curated selection of premium products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className={cn("hidden lg:block w-64 flex-shrink-0")}>
            <FilterSidebar />
          </div>

          {/* Filter Sidebar - Mobile */}
          {isMobile && (
            <div
              className={cn(
                "fixed inset-0 z-50 bg-white dark:bg-gray-950 transform transition-transform duration-300 ease-in-out",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-medium">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
              {isMobile && (
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              )}

              <div className="flex items-center gap-4 ml-auto">
                <SortDropdown value={sortOption} onChange={setSortOption} />

                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-none border-r",
                      viewMode === "grid" && "bg-gray-100 dark:bg-gray-800"
                    )}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      viewMode === "list" && "bg-gray-100 dark:bg-gray-800"
                    )}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Display */}
            {viewMode === "grid" ? (
              <ProductGrid products={currentProducts} isLoading={isLoading} />
            ) : (
              <ProductList products={currentProducts} isLoading={isLoading} />
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
