"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Mail, User, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

const customerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9()-\s]+$/, { message: "Please enter a valid phone number" }),
  createAccount: z.boolean().optional(),
})

type CustomerFormValues = z.infer<typeof customerSchema>

interface CustomerInformationProps {
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    phone: string
    createAccount: boolean
  }
  setCustomerInfo: (info: any) => void
  onContinue: () => void
}

export default function CustomerInformation({ customerInfo, setCustomerInfo, onContinue }: CustomerInformationProps) {
  const [isReturningCustomer, setIsReturningCustomer] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerInfo,
  })

  const onSubmit = (data: CustomerFormValues) => {
    // Simulate form submission delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCustomerInfo(data)
        onContinue()
        resolve()
      }, 800)
    })
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format the phone number
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Customer Information</h2>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isReturningCustomer ? "New customer?" : "Already have an account?"}
          </p>
          <button
            type="button"
            onClick={() => setIsReturningCustomer(!isReturningCustomer)}
            className="text-sm font-medium text-gray-900 dark:text-white hover:underline"
          >
            {isReturningCustomer ? "Create an account" : "Log in"}
          </button>
        </div>

        {isReturningCustomer ? (
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Input id="login-email" type="email" placeholder="your@email.com" className="pl-10" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button type="button" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  Forgot password?
                </button>
              </div>
              <Input id="login-password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={`pl-10 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("email")}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className={`pl-10 ${errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    {...register("firstName")}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className={`pl-10 ${errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    {...register("lastName")}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  className={`pl-10 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("phone", {
                    onChange: (e) => {
                      e.target.value = formatPhoneNumber(e.target.value)
                    },
                  })}
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="createAccount" {...register("createAccount")} />
              <Label htmlFor="createAccount" className="text-sm font-normal cursor-pointer">
                Create an account for faster checkout next time
              </Label>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  Continue to shipping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
