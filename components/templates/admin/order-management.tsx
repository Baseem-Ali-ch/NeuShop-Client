"use client";

import OrderDetails from "@/components/organisms/admin/orders/order-details";
import OrderTable from "@/components/organisms/admin/orders/order-table";
import { useState } from "react";

export default function OrderManagement() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <OrderTable onViewOrder={handleViewOrder} />
      <OrderDetails
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        orderId={selectedOrderId}
      />
    </div>
  );
}