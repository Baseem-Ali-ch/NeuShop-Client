import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative w-64 h-64 mb-8">
        <Image src="/empty-cart-simplicity.png" alt="Empty cart" fill className="object-contain" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
      </p>

      <Link
        href="/products"
        className="inline-flex items-center px-8 py-4 bg-[#FF6B6B] text-white font-bold border-4 border-black hover:bg-[#FF5252] transition-colors shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-2 active:shadow-none transition-all"
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Start Shopping
      </Link>
    </div>
  )
}
