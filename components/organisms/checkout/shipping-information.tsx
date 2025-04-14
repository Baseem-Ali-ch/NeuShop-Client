"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft, MapPin, Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

const shippingSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  apartment: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State/Province is required" }),
  zipCode: z.string().min(1, { message: "ZIP/Postal code is required" }),
  saveAddress: z.boolean().optional(),
  shippingMethod: z.enum(["standard", "express", "nextDay"]),
})

type ShippingFormValues = z.infer<typeof shippingSchema>

interface ShippingInformationProps {
  shippingInfo: {
    address: string
    apartment: string
    city: string
    country: string
    state: string
    zipCode: string
    saveAddress: boolean
    shippingMethod: string
  }
  setShippingInfo: (info: any) => void
  onBack: () => void
  onContinue: () => void
}

export default function ShippingInformation({
  shippingInfo,
  setShippingInfo,
  onBack,
  onContinue,
}: ShippingInformationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      ...shippingInfo,
      shippingMethod: shippingInfo.shippingMethod as "standard" | "express" | "nextDay",
    },
  })

  const watchShippingMethod = watch("shippingMethod")

  const onSubmit = (data: ShippingFormValues) => {
    // Simulate form submission delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setShippingInfo(data)
        onContinue()
        resolve()
      }, 800)
    })
  }

  // Get shipping cost based on method
  const getShippingCost = (method: string) => {
    switch (method) {
      case "express":
        return "$12.99"
      case "nextDay":
        return "$19.99"
      case "standard":
      default:
        return "Free"
    }
  }

  // Get delivery estimate based on method
  const getDeliveryEstimate = (method: string) => {
    const today = new Date()
    const deliveryDate = new Date(today)

    switch (method) {
      case "express":
        deliveryDate.setDate(today.getDate() + 2)
        return `${deliveryDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`
      case "nextDay":
        deliveryDate.setDate(today.getDate() + 1)
        return `${deliveryDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`
      case "standard":
      default:
        deliveryDate.setDate(today.getDate() + 5)
        return `${deliveryDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Shipping Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address">
            Address <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="address"
              placeholder="123 Main St"
              className={`pl-10 ${errors.address ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              {...register("address")}
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.address && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 mt-1"
            >
              {errors.address.message}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
          <div className="relative">
            <Input id="apartment" placeholder="Apt 4B" className="pl-10" {...register("apartment")} />
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              placeholder="New York"
              className={errors.city ? "border-red-500 focus-visible:ring-red-500" : ""}
              {...register("city")}
            />
            {errors.city && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.city.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">
              Country/Region <span className="text-red-500">*</span>
            </Label>
            <Select defaultValue={shippingInfo.country} onValueChange={(value) => setValue("country", value)}>
              <SelectTrigger id="country" className={errors.country ? "border-red-500 focus-visible:ring-red-500" : ""}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.country.message}
              </motion.p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">
              State/Province <span className="text-red-500">*</span>
            </Label>
            <Input
              id="state"
              placeholder="NY"
              className={errors.state ? "border-red-500 focus-visible:ring-red-500" : ""}
              {...register("state")}
            />
            {errors.state && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.state.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">
              ZIP/Postal code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zipCode"
              placeholder="10001"
              className={errors.zipCode ? "border-red-500 focus-visible:ring-red-500" : ""}
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-1"
              >
                {errors.zipCode.message}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="saveAddress" {...register("saveAddress")} />
          <Label htmlFor="saveAddress" className="text-sm font-normal cursor-pointer">
            Save this address for future orders
          </Label>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Shipping Method</h3>

          <RadioGroup
            defaultValue={shippingInfo.shippingMethod}
            onValueChange={(value) => setValue("shippingMethod", value as "standard" | "express" | "nextDay")}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
              <RadioGroupItem value="standard" id="standard" className="border-gray-300 dark:border-gray-700" />
              <Label htmlFor="standard" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Standard Shipping</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">3-5 business days</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">Free</p>
                </div>
                {watchShippingMethod === "standard" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Estimated delivery: {getDeliveryEstimate("standard")}
                  </p>
                )}
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
              <RadioGroupItem value="express" id="express" className="border-gray-300 dark:border-gray-700" />
              <Label htmlFor="express" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Express Shipping</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1-2 business days</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$12.99</p>
                </div>
                {watchShippingMethod === "express" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Estimated delivery: {getDeliveryEstimate("express")}
                  </p>
                )}
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
              <RadioGroupItem value="nextDay" id="nextDay" className="border-gray-300 dark:border-gray-700" />
              <Label htmlFor="nextDay" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Next Day Delivery</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Next business day</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$19.99</p>
                </div>
                {watchShippingMethod === "nextDay" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Estimated delivery: {getDeliveryEstimate("nextDay")}
                  </p>
                )}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button type="button" variant="outline" onClick={onBack} className="sm:flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to customer
          </Button>
          <Button type="submit" disabled={isSubmitting} className="sm:flex-1">
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                Continue to payment
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
