"use client";

import type React from "react";
import { Providers } from "@/app/providers";
import AdminHeader from "@/components/organisms/admin/admin-header";
import AdminSidebar from "@/components/organisms/admin/admin-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route

  // Check if the current route is the login page
  const isLoginPage = pathname === "/admin/auth/login";

  return (
    <Providers>
      <div className="min-h-screen bg-background">
        {!isLoginPage && <AdminHeader />}
        <div className="flex">
          {!isLoginPage && <AdminSidebar />}
          <main
            className={`flex-1 ${
              !isLoginPage ? "lg:ml-[250px] p-4 md:p-6 lg:p-8 pt-[80px]" : ""
            }`}
          >
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </Providers>
  );
}
