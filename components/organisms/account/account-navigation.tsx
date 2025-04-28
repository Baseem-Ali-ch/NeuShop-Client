"use client";

import {
  User,
  ShoppingBag,
  Settings,
  MapPin,
  CreditCard,
  LogOut,
  X,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AccountSection } from "@/components/templates/account-dashboard";
import { logoutUser } from "@/lib/user/authApi";

interface AccountNavigationProps {
  activeSection: AccountSection;
  setActiveSection: (section: AccountSection) => void;
  isMobile: boolean;
  onClose: () => void;
}

export default function AccountNavigation({
  activeSection,
  setActiveSection,
  isMobile,
  onClose,
}: AccountNavigationProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: User,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
    },
    {
      id: "profile",
      label: "Profile Settings",
      icon: Settings,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      id: "payment",
      label: "Payment Methods",
      icon: CreditCard,
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
    },
  ];

  const handleLogout = async () => {
    try {
      const result = await logoutUser();

      if (result.success) {
        localStorage.removeItem("is_loggedIn");

        window.location.href = "/";
      } else {
        console.log(result.message || "Failed to log out.");
      }
    } catch (error) {
      console.log("An error occurred during logout:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Navigation
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id as AccountSection)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activeSection === item.id
                ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}

        <button
          className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Log Out</span>
        </button>
      </nav>
    </div>
  );
}
