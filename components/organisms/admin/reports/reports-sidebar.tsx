"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { setActiveReportCategory } from "@/store/slices/reportsSlice"
import { BarChart3, ShoppingBag, Users, Package, Receipt, TrendingUp, PieChart, Save, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  value: string
  active: boolean
  onClick: () => void
}

function SidebarItem({ icon, label, value, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 text-left transition-colors rounded-md",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default function ReportsSidebar() {
  const dispatch = useDispatch()
  const { activeReportCategory } = useSelector((state: RootState) => state.reports)
  const [searchQuery, setSearchQuery] = useState("")

  const reportCategories = [
    { icon: <BarChart3 size={18} />, label: "Sales Reports", value: "sales" },
    { icon: <ShoppingBag size={18} />, label: "Product Reports", value: "products" },
    { icon: <Users size={18} />, label: "Customer Reports", value: "customers" },
    { icon: <Package size={18} />, label: "Inventory Reports", value: "inventory" },
    { icon: <Receipt size={18} />, label: "Tax Reports", value: "tax" },
    { icon: <TrendingUp size={18} />, label: "Marketing Reports", value: "marketing" },
    { icon: <PieChart size={18} />, label: "Custom Reports", value: "custom" },
    { icon: <Save size={18} />, label: "Saved Reports", value: "saved" },
  ]

  const filteredCategories = reportCategories.filter((category) =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-64 border-r border-border bg-card p-4 overflow-y-auto hidden md:block">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="space-y-1">
        {filteredCategories.map((category) => (
          <SidebarItem
            key={category.value}
            icon={category.icon}
            label={category.label}
            value={category.value}
            active={activeReportCategory === category.value}
            onClick={() => dispatch(setActiveReportCategory(category.value))}
          />
        ))}
      </nav>
    </div>
  )
}
