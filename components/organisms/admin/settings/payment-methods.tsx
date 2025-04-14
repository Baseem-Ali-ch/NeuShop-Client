"use client"
import { CreditCard } from "lucide-react"

export default function PaymentMethods() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Configure payment gateways and options for your store.</p>
      </div>

      <div className="flex items-center justify-center p-12 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Payment Methods Configuration</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This panel would include payment gateway settings, payment method options, and configuration for various
            payment providers like credit cards, PayPal, etc.
          </p>
        </div>
      </div>
    </div>
  )
}
