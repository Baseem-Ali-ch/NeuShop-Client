"use client";

import DashboardOverview from "@/components/organisms/admin/dashboard-overview";
import SalesPerformanceChart from "@/components/organisms/admin/sales-performance-chart";
import RecentOrdersTable from "@/components/organisms/admin/recent-orders-table";
import TopSellingProducts from "@/components/organisms/admin/top-selling-products";
import LowStockAlerts from "@/components/organisms/admin/low-stock-alerts";
import QuickActions from "@/components/organisms/admin/quick-actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("is_admin_loggedIn");
    if (!isLoggedIn) {
      router.push("/admin/auth/login");
    }
  }, [router]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance and recent activity.
        </p>
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesPerformanceChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>
        <div className="space-y-6">
          <TopSellingProducts />
          <LowStockAlerts />
        </div>
      </div>
    </div>
  );
}
