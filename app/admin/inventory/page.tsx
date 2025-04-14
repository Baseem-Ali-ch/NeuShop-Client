import type { Metadata } from "next"
import InventoryManagement from "@/components/templates/admin/inventory-management"

export const metadata: Metadata = {
  title: "Inventory Management | Admin Dashboard",
  description: "Manage your product inventory, stock levels, and warehouse locations",
}

export default function InventoryPage() {
  return <InventoryManagement />
}
