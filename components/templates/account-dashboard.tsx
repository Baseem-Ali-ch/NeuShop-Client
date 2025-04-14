"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountNavigation from "@/components/organisms/account/account-navigation";
import DashboardOverview from "@/components/organisms/account/dashboard-overview";
import OrdersSection from "@/components/organisms/account/orders-section";
import ProfileSettings from "@/components/organisms/account/profile-settings";
import AddressesSection from "@/components/organisms/account/addresses-section";
import PaymentMethodsSection from "@/components/organisms/account/payment-methods-section";

export type AccountSection =
  | "dashboard"
  | "orders"
  | "profile"
  | "addresses"
  | "payment";

export default function AccountDashboard() {
  const [activeSection, setActiveSection] =
    useState<AccountSection>("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [user, setUser] = useState(null);

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/user/data`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  // Close nav when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsNavOpen(false);
    }
  }, [isMobile]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Navigation Toggle */}
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
              My Account
            </h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="lg:hidden shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Navigation Sidebar */}
        <div
          className={`lg:w-64 flex-shrink-0 ${
            isMobile
              ? `fixed inset-0 z-50 ${
                  isNavOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0`
              : ""
          }`}
        >
          <div
            className={`h-full ${
              isMobile && isNavOpen
                ? "bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm p-4"
                : ""
            }`}
          >
            <AccountNavigation
              activeSection={activeSection}
              setActiveSection={(section) => {
                setActiveSection(section);
                if (isMobile) setIsNavOpen(false);
              }}
              isMobile={isMobile}
              onClose={() => setIsNavOpen(false)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeSection === "dashboard" && <DashboardOverview user={user} />}
          {activeSection === "orders" && <OrdersSection />}
          {activeSection === "profile" && <ProfileSettings user={user} />}
          {activeSection === "addresses" && <AddressesSection user={user} />}
          {activeSection === "payment" && <PaymentMethodsSection />}
        </div>
      </div>
    </div>
  );
}
