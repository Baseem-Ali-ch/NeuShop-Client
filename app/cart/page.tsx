import type { Metadata } from "next"
import ShoppingCart from "@/components/templates/shopping-cart"
import Navbar from "@/components/organisms/navbar"
import Footer from "@/components/organisms/footer"

export const metadata: Metadata = {
  title: "Shopping Cart | NeuShop",
  description: "Review and manage your shopping cart items",
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FFFAF0] dark:bg-gray-900">
      <Navbar />
      <main className="pt-20 pb-16">
        <ShoppingCart />
      </main>
      <Footer />
    </div>
  )
}
