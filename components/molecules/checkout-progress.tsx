import { Check } from "lucide-react"
import type { CheckoutStep } from "@/components/templates/checkout-template"

interface CheckoutProgressProps {
  currentStep: CheckoutStep
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { id: "customer", label: "Customer" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  return (
    <div className="relative">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = getCurrentStepIndex() > index

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : isCompleted
                      ? "border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500"
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <span className="text-sm font-medium">{index + 1}</span>}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isActive || isCompleted ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress Line */}
      <div className="absolute top-5 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-800 -z-0">
        <div
          className="h-full bg-gray-900 dark:bg-white transition-all duration-500"
          style={{
            width: `${getCurrentStepIndex() === 0 ? "0%" : getCurrentStepIndex() === 1 ? "50%" : "100%"}`,
          }}
        />
      </div>
    </div>
  )
}
