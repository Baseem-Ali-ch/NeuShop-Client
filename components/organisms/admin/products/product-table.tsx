"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Copy,
  Trash2,
  Eye,
  MoreHorizontal,
  ArrowUpDown,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import type { RootState } from "@/store/store";
import { setSelectedProducts } from "@/store/slices/productSlice";
import { mockProducts } from "@/data/mock-products";
import { categories } from "@/data/mock-categories";
import { fetchProducts } from "@/lib/api";

interface ProductTableProps {
  searchTerm: string;
  filters: any;
  onEditProduct: (product: any) => void;
}

export default function ProductTable({
  searchTerm,
  filters,
  onEditProduct,
}: ProductTableProps) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state: RootState) => state.products.selectedProducts
  );

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [editingName, setEditingName] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("data", data);
        setProducts(data.data); // Adjust based on your API response structure
        setFilteredProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optionally show a toast notification
      }
    };

    loadProducts();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.sku.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply status filter
    if (filters.status.length > 0) {
      result = result.filter((product) =>
        filters.status.includes(product.status)
      );
    }

    // Apply date filter
    if (filters.dateRange[0] || filters.dateRange[1]) {
      result = result.filter((product) => {
        const productDate = new Date(product.dateAdded);
        const startDate = filters.dateRange[0];
        const endDate = filters.dateRange[1];

        if (startDate && endDate) {
          return productDate >= startDate && productDate <= endDate;
        } else if (startDate) {
          return productDate >= startDate;
        } else if (endDate) {
          return productDate <= endDate;
        }

        return true;
      });
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, filters, products, sortConfig]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }

    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageIds = getCurrentPageItems().map((product) => product.id);
      dispatch(setSelectedProducts(currentPageIds));
    } else {
      dispatch(setSelectedProducts([]));
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      dispatch(setSelectedProducts([...selectedProducts, productId]));
    } else {
      dispatch(
        setSelectedProducts(selectedProducts.filter((id) => id !== productId))
      );
    }
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      // In a real app, you would call an API to delete the product
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDuplicateProduct = (product: any) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id)) + 1,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
    };

    setProducts([...products, newProduct]);
  };

  const handleToggleStatus = (productId: number, isActive: boolean) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, status: isActive ? "active" : "draft" }
          : product
      )
    );
  };

  const handleNameEdit = (product: any) => {
    setEditingName({ id: product.id, name: product.name });
  };

  const handleNameSave = () => {
    if (editingName) {
      setProducts(
        products.map((product) =>
          product.id === editingName.id
            ? { ...product, name: editingName.name }
            : product
        )
      );
      setEditingName(null);
    }
  };

  const handleNameCancel = () => {
    setEditingName(null);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getInventoryColor = (stock: number, threshold: number) => {
    if (stock <= 0) return "bg-red-500";
    if (stock <= threshold) return "bg-amber-500";
    return "bg-green-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "draft":
        return "text-amber-500";
      case "out-of-stock":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <>
      <div className="glassmorphism rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-background/50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      getCurrentPageItems().length > 0 &&
                      getCurrentPageItems().every((product) =>
                        selectedProducts.includes(product.id)
                      )
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all products"
                  />
                </TableHead>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Product Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                    {sortConfig?.key === "name" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-3 w-3" />
                      ) : (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("categoryId")}
                  >
                    Category
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("stock")}
                  >
                    Inventory
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageItems().length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                getCurrentPageItems().map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-background/40 transition-colors group"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) =>
                          handleSelectProduct(product.id, checked as boolean)
                        }
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="relative h-12 w-12 rounded-md overflow-hidden border border-border">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
                            product.images[0] || "/placeholder.svg"
                          }`}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingName && editingName.id === product.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            value={editingName.name}
                            onChange={(e) =>
                              setEditingName({
                                ...editingName,
                                name: e.target.value,
                              })
                            }
                            className="h-8 py-1"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={handleNameSave}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={handleNameCancel}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="font-medium cursor-pointer hover:text-primary"
                          onClick={() => handleNameEdit(product)}
                        >
                          {product.name}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {product.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {categories[product.categoryId]?.name || "Unknown"}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${product.salePrice.toFixed(2)}
                      </div>
                      {product.price && (
                        <div className="text-xs text-muted-foreground line-through">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{product.stock}</span>
                          <span className="text-muted-foreground">
                            / {product.stock + 100}
                          </span>
                        </div>
                        <Progress
                          value={(product.stock / (product.stock + 100)) * 100}
                          className="h-2"
                          indicatorClassName={getInventoryColor(
                            product.stock,
                            product.lowStockThreshold
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={product.status === "active"}
                          onCheckedChange={(checked) =>
                            handleToggleStatus(product.id, checked)
                          }
                        />
                        <span className={getStatusColor(product.status)}>
                          {product.status?.charAt(0).toUpperCase() +
                            product.status?.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="glassmorphism-dropdown"
                        >
                          <DropdownMenuItem
                            onClick={() => onEditProduct(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateProduct(product)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Quick View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(product)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4 py-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="h-8 rounded-md border border-border bg-background px-2"
            >
              {[5, 10, 20, 50, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <span>of {filteredProducts.length} items</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;

                if (totalPages > 5) {
                  if (currentPage > 3 && currentPage < totalPages - 1) {
                    pageNum = currentPage - 2 + i;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 4 + i;
                  }
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="mx-1">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="glassmorphism-modal">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{productToDelete?.name}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
