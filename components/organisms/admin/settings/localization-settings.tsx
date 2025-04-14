"use client"
import { Globe } from "lucide-react"

export default function LocalizationSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Localization</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Configure language, currency, and regional settings for your store.
        </p>
      </div>

      <div className="flex items-center justify-center p-12 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Localization Settings</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This panel would include language settings, currency configuration, date/time formats, and country/region
            settings for your store.
          </p>
        </div>
      </div>
    </div>
  )
}
