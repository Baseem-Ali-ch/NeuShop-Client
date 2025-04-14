"use client"

import {
  Settings,
  Store,
  Globe,
  CreditCard,
  Truck,
  Percent,
  Users,
  Mail,
  Plug,
  Terminal,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsSidebarProps {
  activePanel: string
  onPanelChange: (panel: string) => void
}

export default function SettingsSidebar({ activePanel, onPanelChange }: SettingsSidebarProps) {
  const menuItems = [
    { id: "general", label: "General Settings", icon: Settings },
    { id: "store", label: "Store Information", icon: Store },
    { id: "localization", label: "Localization", icon: Globe },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "shipping", label: "Shipping & Delivery", icon: Truck },
    { id: "tax", label: "Tax Configuration", icon: Percent },
    { id: "users", label: "User Management", icon: Users },
    { id: "email", label: "Email Settings", icon: Mail },
    { id: "integrations", label: "Integrations", icon: Plug },
    { id: "advanced", label: "Advanced", icon: Terminal },
  ]

  return (
    <div className="w-64 border-r bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPanelChange(item.id)}
                  className={cn(
                    "flex items-center w-full px-4 py-3 rounded-md text-left transition-colors",
                    activePanel === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight
                    className={cn("h-4 w-4 transition-transform", activePanel === item.id ? "rotate-90" : "")}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
