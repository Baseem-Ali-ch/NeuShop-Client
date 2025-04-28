"use client";

import type React from "react";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart3,
  Box,
  ChevronDown,
  ChevronRight,
  Cog,
  Home,
  LineChart,
  Package,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react";
import type { RootState } from "@/store/store";
import { closeSidebar, toggleSidebar } from "@/store/slices/uiSlice";
import { cn } from "@/lib/user/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
  submenuItems?: Array<{
    label: string;
    href: string;
  }>;
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  onClick,
  submenuItems = [],
}: SidebarItemProps) {
  return (
    <div className="mb-1">
      <Link
        href={href}
        className={cn(
          "flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all",
          isActive
            ? "bg-primary/10 text-primary shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.5)]"
            : "hover:bg-muted"
        )}
        onClick={onClick}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span>{label}</span>
        {hasSubmenu && (
          <div className="ml-auto">
            {isSubmenuOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </Link>
      {hasSubmenu && isSubmenuOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {submenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center py-2 px-4 rounded-lg text-sm transition-all hover:bg-muted"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const isSidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      dispatch(closeSidebar());
    }
  }, [pathname, isMobile, isSidebarOpen, dispatch]);

  const sidebarItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/admin",
      isActive: pathname === "/admin",
    },
    {
      icon: Package,
      label: "Products",
      href: "/admin/products",
      isActive: pathname.startsWith("/admin/products"),
    },
    {
      icon: ShoppingBag,
      label: "Orders",
      href: "/admin/orders",
      isActive: pathname.startsWith("/admin/orders"),
    },
    {
      icon: Users,
      label: "Customers",
      href: "/admin/customers",
      isActive: pathname.startsWith("/admin/customers"),
    },
    {
      icon: Tag,
      label: "Categories",
      href: "/admin/categories",
      isActive: pathname.startsWith("/admin/categories"),
    },
    {
      icon: Box,
      label: "Inventory",
      href: "/admin/inventory",
      isActive: pathname.startsWith("/admin/inventory"),
    },
    {
      icon: LineChart,
      label: "Marketing",
      href: "/admin/marketing",
      isActive: pathname.startsWith("/admin/marketing"),
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/admin/analytics",
      isActive: pathname.startsWith("/admin/analytics"),
    },
    {
      icon: Cog,
      label: "Settings",
      href: "/admin/settings",
      isActive: pathname.startsWith("/admin/settings"),
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform bg-background border-r border-border pt-16 transition-transform duration-200 ease-in-out",
        isSidebarOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
              onClick={() => isMobile && dispatch(toggleSidebar())}
            />
          ))}
        </nav>
      </div>
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
    </div>
  );
}
