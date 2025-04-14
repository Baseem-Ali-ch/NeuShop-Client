import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

export default function EmptyCheckout() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative w-64 h-64 mb-8">
        <Image src="/empty-cart-simplicity.png" alt="Empty cart" fill className="object-contain" />
      </div>

      <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4">Your cart is empty</h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        You need to add items to your cart before proceeding to checkout.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        Browse Products
      </Link>
    </div>
  )
}
