"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CartItemList from "@/components/organisms/cart-item-list"
import OrderSummary from "@/components/organisms/order-summary"
import EmptyCart from "@/components/organisms/empty-cart"
import SuggestedProducts from "@/components/organisms/suggested-products"
import type { RootState } from "@/store/store"
import { clearCart } from "@/store/slices/cartSlice"
import { products } from "@/data/products"

export default function ShoppingCart() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount)
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  // Get suggested products (random selection)
  const suggestedProducts = products.slice(0, 4)

  // Handle clear cart with animation
  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      dispatch(clearCart())
      setIsClearing(false)
    }, 600)
  }

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">Your Cart</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {cartItems.length > 0
            ? `You have ${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <Link
                href="/products"
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
              >
                {isClearing ? "Clearing..." : "Clear Cart"}
              </button>
            </div>
            <CartItemList />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary subtotal={totalAmount} />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}

      {/* Suggested Products */}
      <div className="mt-20">
        <SuggestedProducts products={suggestedProducts} />
      </div>
    </div>
  )
}
