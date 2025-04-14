"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

interface OrderSummaryProps {
  subtotal: number
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const router = useRouter()
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponError, setCouponError] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Calculate shipping cost based on selected method
  const getShippingCost = () => {
    switch (shippingMethod) {
      case "express":
        return 12.99
      case "nextDay":
        return 19.99
      case "standard":
      default:
        return subtotal >= 100 ? 0 : 5.99
    }
  }

  // Calculate tax (example: 8%)
  const tax = subtotal * 0.08

  // Calculate total
  const total = subtotal + getShippingCost() + tax - discount

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }

    setIsApplyingCoupon(true)
    setCouponError("")

    // Simulate API call to validate coupon
    setTimeout(() => {
      if (couponCode.toUpperCase() === "NEOSHOP20") {
        const discountAmount = subtotal * 0.2
        setDiscount(discountAmount)
        setCouponError("")
      } else {
        setDiscount(0)
        setCouponError("Invalid coupon code")
      }
      setIsApplyingCoupon(false)
    }, 1000)
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate redirect to checkout page
    setTimeout(() => {
      router.push("/checkout")
    }, 1000)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-700 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

      {/* Subtotal */}
      <div className="flex justify-between py-3 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
        <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
      </div>

      {/* Shipping Options */}
      <div className="py-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {getShippingCost() === 0 ? "Free" : `$${getShippingCost().toFixed(2)}`}
          </span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="shipping"
              value="standard"
              checked={shippingMethod === "standard"}
              onChange={() => setShippingMethod("standard")}
              className="mr-2 accent-[#FF6B6B]"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Standard Shipping</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">3-5 business days</div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {subtotal >= 100 ? "Free" : "$5.99"}
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="shipping"
              value="express"
              checked={shippingMethod === "express"}
              onChange={() => setShippingMethod("express")}
              className="mr-2 accent-[#FF6B6B]"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Express Shipping</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">1-2 business days</div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">$12.99</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="shipping"
              value="nextDay"
              checked={shippingMethod === "nextDay"}
              onChange={() => setShippingMethod("nextDay")}
              className="mr-2 accent-[#FF6B6B]"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Next Day Delivery</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Next business day</div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">$19.99</span>
          </label>
        </div>
      </div>

      {/* Tax */}
      <div className="flex justify-between py-3 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
        <span className="text-gray-600 dark:text-gray-400">Estimated Tax</span>
        <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
      </div>

      {/* Coupon Code */}
      <div className="py-4 border-b-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Discount</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={isApplyingCoupon}
            className="px-4 py-2 bg-[#4CAF50] text-white border-2 border-black hover:bg-[#43A047] transition-colors disabled:opacity-70"
          >
            {isApplyingCoupon ? "Applying..." : "Apply"}
          </button>
        </div>

        {couponError && <p className="mt-2 text-sm text-red-500 dark:text-red-400">{couponError}</p>}

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Try code: NEOSHOP20 for 20% off</p>
      </div>

      {/* Total */}
      <div className="flex justify-between py-4 mb-6">
        <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
        <motion.span
          key={total}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          ${total.toFixed(2)}
        </motion.span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isCheckingOut}
        className="w-full py-4 bg-[#FF6B6B] text-white text-lg font-bold border-4 border-black hover:bg-[#FF5252] transition-colors shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-2 active:shadow-none transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {isCheckingOut ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            Checkout
          </>
        )}
      </button>

      <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
        Taxes and shipping calculated at checkout
      </div>
    </div>
  )
}
