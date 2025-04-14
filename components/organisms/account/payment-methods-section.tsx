"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CreditCard, Plus, Edit, Trash2, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Form validation schema
const paymentMethodSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  cardholderName: z.string().min(1, "Cardholder name is required"),
  expiryMonth: z.string().min(1, "Expiry month is required"),
  expiryYear: z.string().min(1, "Expiry year is required"),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
  isDefault: z.boolean().optional(),
})

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>

// Mock payment methods
const mockPaymentMethods = [
  {
    id: 1,
    cardNumber: "4111111111111111",
    cardholderName: "Thomas Anderson",
    expiryMonth: "12",
    expiryYear: "2025",
    cvv: "123",
    isDefault: true,
    cardType: "visa",
  },
  {
    id: 2,
    cardNumber: "5555555555554444",
    cardholderName: "Thomas Anderson",
    expiryMonth: "06",
    expiryYear: "2024",
    cvv: "456",
    isDefault: false,
    cardType: "mastercard",
  },
]

export default function PaymentMethodsSection() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardType, setCardType] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    },
  })

  // Watch card number for card type detection
  const watchCardNumber = watch("cardNumber", "")

  // Detect card type based on first digits
  const detectCardType = (cardNumber: string) => {
    const visaPattern = /^4/
    const mastercardPattern = /^5[1-5]/
    const amexPattern = /^3[47]/
    const discoverPattern = /^6(?:011|5)/

    if (visaPattern.test(cardNumber)) return "visa"
    if (mastercardPattern.test(cardNumber)) return "mastercard"
    if (amexPattern.test(cardNumber)) return "amex"
    if (discoverPattern.test(cardNumber)) return "discover"
    return ""
  }

  // Format card number as user types
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const detectedCardType = detectCardType(digits)
    setCardType(detectedCardType)
    return digits
  }

  // Start editing a payment method
  const handleEdit = (payment: any) => {
    setEditingPaymentId(payment.id)
    reset(payment)
    setCardType(payment.cardType)
    setShowAddForm(true)
  }

  // Delete a payment method
  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter((payment) => payment.id !== id))
  }

  // Set a payment method as default
  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === id,
      })),
    )
  }

  // Handle form submission
  const onSubmit = (data: PaymentMethodFormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const paymentData = {
        ...data,
        cardType: cardType || detectCardType(data.cardNumber),
      }

      if (editingPaymentId) {
        // Update existing payment method
        setPaymentMethods(
          paymentMethods.map((payment) => {
            if (payment.id === editingPaymentId) {
              return {
                ...paymentData,
                id: editingPaymentId,
              }
            }
            // If setting a new default, update other payment methods
            if (paymentData.isDefault && payment.isDefault) {
              return {
                ...payment,
                isDefault: false,
              }
            }
            return payment
          }),
        )
      } else {
        // Add new payment method
        const newPayment = {
          ...paymentData,
          id: Math.max(0, ...paymentMethods.map((p) => p.id)) + 1,
        }

        // If setting a new default, update other payment methods
        if (paymentData.isDefault) {
          setPaymentMethods([
            newPayment,
            ...paymentMethods.map((payment) => ({
              ...payment,
              isDefault: false,
            })),
          ])
        } else {
          setPaymentMethods([newPayment, ...paymentMethods])
        }
      }

      // Reset form and state
      reset()
      setShowAddForm(false)
      setEditingPaymentId(null)
      setIsSubmitting(false)
      setCardType("")
    }, 1500)
  }

  // Get card icon based on card type
  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "/stylized-payment-network.png"
      case "mastercard":
        return "/interlocking-circles.png"
      case "amex":
        return "/amex-card-close-up.png"
      case "discover":
        return "/abstract-geometric-logo.png"
      default:
        return "/diverse-hands-credit-cards.png"
    }
  }

  // Format card number for display
  const formatCardNumberForDisplay = (cardNumber: string) => {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`
  }

  // Check if a card is expired
  const isCardExpired = (month: string, year: string) => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // JavaScript months are 0-indexed

    const expYear = Number.parseInt(`20${year}`, 10)
    const expMonth = Number.parseInt(month, 10)

    return expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)
  }

  // Generate years for dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 10; i++) {
      const year = (currentYear + i).toString().slice(-2)
      years.push(year)
    }
    return years
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Payment Methods</h1>
          <Button
            onClick={() => {
              reset()
              setEditingPaymentId(null)
              setCardType("")
              setShowAddForm(!showAddForm)
            }}
            className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
          >
            {showAddForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> Add Payment Method
              </>
            )}
          </Button>
        </div>

        {/* Add/Edit Payment Method Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                  {editingPaymentId ? "Edit Payment Method" : "Add New Payment Method"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="cardNumber">
                        Card Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex space-x-2">
                        <Image
                          src="/stylized-payment-network.png"
                          alt="Visa"
                          width={36}
                          height={24}
                          className={`object-contain ${cardType === "visa" ? "opacity-100" : "opacity-40"}`}
                        />
                        <Image
                          src="/interlocking-circles.png"
                          alt="Mastercard"
                          width={36}
                          height={24}
                          className={`object-contain ${cardType === "mastercard" ? "opacity-100" : "opacity-40"}`}
                        />
                        <Image
                          src="/amex-card-close-up.png"
                          alt="American Express"
                          width={36}
                          height={24}
                          className={`object-contain ${cardType === "amex" ? "opacity-100" : "opacity-40"}`}
                        />
                        <Image
                          src="/abstract-geometric-logo.png"
                          alt="Discover"
                          width={36}
                          height={24}
                          className={`object-contain ${cardType === "discover" ? "opacity-100" : "opacity-40"}`}
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        {...register("cardNumber", {
                          onChange: (e) => {
                            e.target.value = formatCardNumber(e.target.value)
                          },
                        })}
                        className={`pl-10 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                          errors.cardNumber ? "border-red-500" : ""
                        }`}
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.cardNumber && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.cardNumber.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">
                      Cardholder Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      {...register("cardholderName")}
                      className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                        errors.cardholderName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.cardholderName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errors.cardholderName.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">
                        Expiry Month <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        defaultValue={
                          editingPaymentId ? paymentMethods.find((p) => p.id === editingPaymentId)?.expiryMonth : ""
                        }
                        onValueChange={(value) => setValue("expiryMonth", value)}
                      >
                        <SelectTrigger
                          id="expiryMonth"
                          className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                            errors.expiryMonth ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = (i + 1).toString().padStart(2, "0")
                            return (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      {errors.expiryMonth && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.expiryMonth.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">
                        Expiry Year <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        defaultValue={
                          editingPaymentId ? paymentMethods.find((p) => p.id === editingPaymentId)?.expiryYear : ""
                        }
                        onValueChange={(value) => setValue("expiryYear", value)}
                      >
                        <SelectTrigger
                          id="expiryYear"
                          className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                            errors.expiryYear ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateYears().map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.expiryYear && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.expiryYear.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">
                        CVV <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        {...register("cvv")}
                        className={`shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)] ${
                          errors.cvv ? "border-red-500" : ""
                        }`}
                      />
                      {errors.cvv && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {errors.cvv.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="isDefault" {...register("isDefault")} />
                    <Label htmlFor="isDefault" className="text-sm font-normal cursor-pointer">
                      Set as default payment method
                    </Label>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-white dark:border-gray-800 dark:border-t-gray-900" />
                          {editingPaymentId ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>{editingPaymentId ? "Update Payment Method" : "Add Payment Method"}</>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Methods List */}
        {paymentMethods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((payment) => {
              const isExpired = isCardExpired(payment.expiryMonth, payment.expiryYear)

              return (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    payment.isDefault
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : "bg-gray-50 dark:bg-gray-700/50"
                  } shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-6 mr-2 relative">
                        <Image
                          src={getCardIcon(payment.cardType) || "/placeholder.svg"}
                          alt={payment.cardType}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {formatCardNumberForDisplay(payment.cardNumber)}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      {payment.isDefault && (
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full mr-2">
                          Default
                        </span>
                      )}
                      {isExpired && (
                        <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                          Expired
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="ml-12 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>{payment.cardholderName}</p>
                    <p>
                      Expires: {payment.expiryMonth}/{payment.expiryYear}
                    </p>
                  </div>

                  <div className="mt-4 ml-12 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(payment)}
                      className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(payment.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    {!payment.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(payment.id)}
                        className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
                      >
                        <Check className="h-4 w-4 mr-1" /> Set as Default
                      </Button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]">
            <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Payment Methods Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add your first payment method to make checkout faster.
            </p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Payment Method
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
