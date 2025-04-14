import type React from "react"
import { Providers } from "@/app/providers"
import AdminHeader from "@/components/organisms/admin/admin-header"
import AdminSidebar from "@/components/organisms/admin/admin-sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 pt-[80px]">{children}</main>
        </div>
        <Toaster />
      </div>
    </Providers>
  )
}
