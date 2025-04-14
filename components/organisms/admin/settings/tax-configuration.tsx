"use client"
import { Percent } from "lucide-react"

export default function TaxConfiguration() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tax Configuration</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Configure tax rates, classes, and calculation methods.</p>
      </div>

      <div className="flex items-center justify-center p-12 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Percent className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Tax Configuration</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This panel would include tax calculation methods, tax classes, tax rates by location, and tax exemption
            settings for your store.
          </p>
        </div>
      </div>
    </div>
  )
}
