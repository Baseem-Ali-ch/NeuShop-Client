import OrderManagement from "@/components/templates/admin/order-management"

export const metadata = {
  title: "Order Management | Admin Dashboard",
  description: "Manage all customer orders in one place",
}

export default function OrdersPage() {
  return <OrderManagement />
}
