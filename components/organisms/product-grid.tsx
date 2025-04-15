"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/molecules/product-card";
import ProductCardSkeleton from "@/components/molecules/product-card-skeleton";
import { fetchProductsUser } from "@/lib/api";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ isLoading = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsUser();
        console.log(
          "Fetched products:",
          data.products.map((p: any) => ({ id: p._id, name: p.name }))
        );
        const mappedProducts = data.products.map((product: any) => ({
          id: product._id,
          name: product.name,
          image: product.images?.[0] || "/placeholder.svg",
          price: product.price,
          salePrice: product.salePrice,
          stock: product.stock,
          status:
            product.status || (product.stock > 0 ? "active" : "out-of-stock"),
        }));
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
        {[...Array(12)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
      {filteredProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
