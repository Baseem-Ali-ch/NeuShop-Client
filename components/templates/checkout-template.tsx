"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import CustomerInformation from "@/components/organisms/checkout/customer-information"
import ShippingInformation from "@/components/organisms/checkout/shipping-information"
import PaymentMethod from "@/components/organisms/checkout/payment-method"
import OrderSummary from "@/components/organisms/checkout/order-summary"
import CheckoutProgress from "@/components/molecules/checkout-progress"
import EmptyCheckout from "@/components/organisms/checkout/empty-checkout"
import type { RootState } from "@/store/store"

export type CheckoutStep = "customer" | "shipping" | "payment"

export default function CheckoutTemplate() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("customer")
  const [isClient, setIsClient] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount)

  // Customer information state
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    createAccount: false,
  })

  // Shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    saveAddress: false,
    shippingMethod: "standard",
  })

  // Payment information state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    sameAsShipping: true,
    paymentMethod: "creditCard",
  })

  // Handle step navigation
  const goToStep = (step: CheckoutStep) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  // If cart is empty, show empty checkout message
  if (cartItems.length === 0) {
    return <EmptyCheckout />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Checkout Progress */}
        <div className="mb-10">
          <CheckoutProgress currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Forms */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === "customer" && (
                <motion.div
                  key="customer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CustomerInformation
                    customerInfo={customerInfo}
                    setCustomerInfo={setCustomerInfo}
                    onContinue={() => goToStep("shipping")}
                  />
                </motion.div>
              )}

              {currentStep === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShippingInformation
                    shippingInfo={shippingInfo}
                    setShippingInfo={setShippingInfo}
                    onBack={() => goToStep("customer")}
                    onContinue={() => goToStep("payment")}
                  />
                </motion.div>
              )}

              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentMethod
                    paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    shippingInfo={shippingInfo}
                    onBack={() => goToStep("shipping")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary subtotal={totalAmount} shippingMethod={shippingInfo.shippingMethod} />
          </div>
        </div>
      </div>
    </div>
  )
}
