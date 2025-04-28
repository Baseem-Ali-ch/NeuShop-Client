"use client";

import { useState } from "react";

interface PromotionsTableProps {
  type?: "all" | "email" | "social" | "discount";
}

export default function PromotionsTable({
  type = "all",
}: PromotionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for promotions
  const promotions = [
    {
      id: 1,
      name: "Summer Sale 2023",
      type: "percent",
      value: "20%",
      startDate: "2023-06-01",
      endDate: "2023-06-05",
    },
  ];
}
