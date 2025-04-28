"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductHeader from "@/components/organisms/admin/products/product-header"
import ProductFilters from "@/components/organisms/admin/products/product-filters"
import ProductTable from "@/components/organisms/admin/products/product-table"
import ProductModal from "@/components/organisms/admin/products/product-modal"
import type { RootState } from "@/store/store"
import { setSelectedProducts } from "@/store/slices/productSlice"

export default function ProductManagement() {
  const dispatch = useDispatch()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>({
    categories: [],
    priceRange: [0, 1000],
    status: [],
    dateRange: [null, null],
  })

  const selectedProducts = useSelector((state: RootState) => state.products.selectedProducts)

  const handleAddProduct = () => {
    setCurrentProduct(null)
    setIsAddModalOpen(true)
  }

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product)
    setIsEditModalOpen(true)
  }

  const handleBulkEdit = () => {
    if (selectedProducts.length > 0) {
      setIsBulkEditOpen(true)
    }
  }

  const handleClearSelection = () => {
    dispatch(setSelectedProducts([]))
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters)
  }

  const handleClearFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: [0, 1000],
      status: [],
      dateRange: [null, null],
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductHeader
        onAddProduct={handleAddProduct}
        onBulkEdit={handleBulkEdit}
        selectedCount={selectedProducts.length}
        onClearSelection={handleClearSelection}
      />

      <ProductFilters
        onSearch={handleSearch}
        filters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <ProductTable searchTerm={searchTerm} filters={activeFilters} onEditProduct={handleEditProduct} />

      {isAddModalOpen && (
        <ProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} product={null} mode="add" />
      )}

      {isEditModalOpen && (
        <ProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={currentProduct}
          mode="edit"
        />
      )}
    </div>
  )
}
