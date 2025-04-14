import type { Metadata } from "next"
import CheckoutTemplate from "@/components/templates/checkout-template"
import Navbar from "@/components/organisms/navbar"
import Footer from "@/components/organisms/footer"

export const metadata: Metadata = {
  title: "Checkout | NeuShop",
  description: "Complete your purchase securely",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="pt-20 pb-16">
        <CheckoutTemplate />
      </main>
      <Footer />
    </div>
  )
}
