import type { Metadata } from "next"
import AccountDashboard from "@/components/templates/account-dashboard"
import Navbar from "@/components/organisms/navbar"
import Footer from "@/components/organisms/footer"

export const metadata: Metadata = {
  title: "My Account | NeuShop",
  description: "Manage your account, orders, and preferences",
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <AccountDashboard />
      </main>
      <Footer />
    </div>
  )
}
