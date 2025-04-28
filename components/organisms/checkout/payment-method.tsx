"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { placeOrder } from "@/lib/user/checkoutApi";

// Schema for payment form validation
const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, {
      message:
        "Card number must be 16 digits in the format XXXX XXXX XXXX XXXX",
    })
    .transform((value) => value.replace(/\s+/g, "")), // Remove spaces for further processing
  cardholderName: z.string().min(1, { message: "Cardholder name is required" }),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, {
    message: "Expiry month must be between 01 and 12",
  }),
  expiryYear: z
    .string()
    .regex(/^\d{2}$/, { message: "Expiry year must be in YY format" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
  sameAsShipping: z.boolean().optional(),
  paymentMethod: z.enum(["creditCard", "paypal", "applePay"]),
});

type PaymentFormValues = z.infer<typeof paymentSchema> & {
  _id?: string;
};

interface PaymentMethod {
  _id: string;
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  isDefault: boolean;
  cardType?: string;
}

interface PaymentMethodProps {
  paymentInfo: any;
  setPaymentInfo: (info: any) => void;
  paymentMethods: PaymentMethod[];
  shippingInfo: {
    address: string;
    apartment: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  onBack: () => void;
  subtotal: number;
}

export default function PaymentMethod({
  paymentInfo,
  setPaymentInfo,
  paymentMethods,
  shippingInfo,
  subtotal,
  onBack,
}: PaymentMethodProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [cardType, setCardType] = useState<string>("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const total = useSelector((state: RootState) => state.cart.total);

  // Set default payment method on component mount
  useEffect(() => {
    const defaultPayment = paymentMethods.find((payment) => payment.isDefault);
    if (defaultPayment) {
      setSelectedPaymentId(defaultPayment._id);
    } else if (paymentMethods.length > 0) {
      setSelectedPaymentId(paymentMethods[0]._id);
    }
  }, [paymentMethods]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      ...paymentInfo,
      paymentMethod: "creditCard",
    },
  });

  const watchSameAsShipping = watch("sameAsShipping");
  const watchPaymentMethod = watch("paymentMethod");

  // Helper function to check if card is expired
  const isCardExpired = (month: string, year: string) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expiryYear = parseInt(year);
    const expiryMonth = parseInt(month);

    return (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    );
  };

  // Helper function to format card number for display
  const formatCardNumberForDisplay = (cardNumber: string) => {
    if (!cardNumber) return "";
    // Keep only the last 4 digits visible
    return `•••• •••• •••• ${cardNumber.slice(-4)}`;
  };

  // Helper function to get card icon based on card type
  const getCardIcon = (cardType: string) => {
    const cardIcons = {
      visa: "/visa-card.png",
      mastercard: "/mastercard.png",
      amex: "/amex-card.png",
      discover: "/discover-card.png",
    };
    return (
      cardIcons[cardType as keyof typeof cardIcons] ||
      "/credit-card-generic.png"
    );
  };

  const orderDetails = () => {
    // Redirect to order details page
    window.location.href = "/account?section=orders";
  };

  const onSubmit = async (data: PaymentFormValues) => {
    setIsProcessing(true);
  
    try {
      // If using saved payment method
      let paymentData = data;
      if (selectedPaymentId && !showNewCardForm) {
        const selectedPayment = paymentMethods.find(
          (p) => p._id === selectedPaymentId
        );
        if (selectedPayment) {
          paymentData = {
            ...data,
            cardNumber: selectedPayment.cardNumber,
            cardholderName: selectedPayment.cardholderName,
            expiryMonth: selectedPayment.expiryMonth,
            expiryYear: selectedPayment.expiryYear,
            _id: selectedPayment._id,
          };
        }
      }
  
      // Combine payment info, shipping info, and other order details
      const orderData = {
        paymentInfo: paymentData,
        shippingInfo,
        items: cartItems,
        subtotal: subtotal,
        total: total,
        tax: subtotal * 0.08,
      };
      console.log('order data', orderData)
  
      // Call the API to place the order
      const result = await placeOrder(orderData);
      console.log("Order saved successfully:", result);
  
      // Mark the order as complete
      setPaymentInfo(paymentData);
      setIsOrderComplete(true);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Detect card type based on first digits
  const detectCardType = (cardNumber: string) => {
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;
    const discoverPattern = /^6(?:011|5)/;

    if (visaPattern.test(cardNumber)) return "visa";
    if (mastercardPattern.test(cardNumber)) return "mastercard";
    if (amexPattern.test(cardNumber)) return "amex";
    if (discoverPattern.test(cardNumber)) return "discover";
    return "";
  };

  // Format card number as user types
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const cardType = detectCardType(digits);
    setCardType(cardType);

    // Format based on card type
    if (cardType === "amex") {
      return digits.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3").trim();
    } else {
      return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    }
  };

  // Handle selecting a saved payment method
  const handleSelectPayment = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setShowNewCardForm(false);
  };

  // Handle adding a new card
  const handleAddNewCard = () => {
    setShowNewCardForm(true);
    setSelectedPaymentId(null);
    reset({
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      sameAsShipping: true,
      paymentMethod: "creditCard",
    });
  };

  if (isOrderComplete) {
    return (
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-4">
          Order Complete!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="sm:flex-1"
            onClick={orderDetails}
          >
            View Order Details
          </Button>
          <Button className="sm:flex-1">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-gray-900 dark:text-white">
          Payment Method
        </h2>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Lock className="h-4 w-4 mr-1" />
          Secure Checkout
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs
          defaultValue="creditCard"
          onValueChange={(value) =>
            setValue(
              "paymentMethod",
              value as "creditCard" | "paypal" | "applePay"
            )
          }
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="creditCard"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900"
            >
              Credit Card
            </TabsTrigger>
            <TabsTrigger
              value="paypal"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900"
            >
              PayPal
            </TabsTrigger>
            <TabsTrigger
              value="applePay"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900"
            >
              Apple Pay
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creditCard" className="space-y-6">
            {/* Saved Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="mb-6 ">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Saved Payment Methods
                  </h3>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddNewCard}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    New Card
                  </Button>
                </div>

                {/* Add New Card Button
        <div
          className={`p-4 rounded-lg cursor-pointer flex items-center justify-center border-2 ${
            showNewCardForm
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600"
              : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
          } shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors`}
          onClick={handleAddNewCard}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
              <Plus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Add New Card
            </p>
          </div>
        </div> */}

                <RadioGroup
                  value={selectedPaymentId || ""}
                  onValueChange={(value) => handleSelectPayment(value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {paymentMethods.map((payment) => {
                    const isExpired = isCardExpired(
                      payment.expiryMonth,
                      payment.expiryYear
                    );

                    return (
                      <div
                        key={payment._id}
                        className={`relative p-4 rounded-lg border-2 ${
                          selectedPaymentId === payment._id
                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600"
                            : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                        } shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors`}
                      >
                        <RadioGroupItem
                          id={`payment-${payment._id}`}
                          value={payment._id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`payment-${payment._id}`}
                          className="cursor-pointer w-full h-full block"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-10 h-6 mr-2 relative">
                                <Image
                                  src={getCardIcon(payment.cardType || "")}
                                  alt={payment.cardType || "Credit Card"}
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

                          <div className="ml-10 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p>{payment.cardholderName}</p>
                            <p>
                              Expires: {payment.expiryMonth}/
                              {payment.expiryYear}
                            </p>
                          </div>
                        </Label>
                        {selectedPaymentId === payment._id && (
                          <span className="absolute top-2 right-2 w-6 h-6 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            )}

            {/* New Card Form */}
            {showNewCardForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className={`pl-10 ${
                        errors.cardNumber
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                      {...register("cardNumber", {
                        onChange: (e) => {
                          const formatted = formatCardNumber(e.target.value);
                          e.target.value = formatted;
                        },
                      })}
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {cardType && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Image
                          src={`/credit-card-${cardType}.png`}
                          alt={cardType}
                          width={32}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  {errors.cardNumber && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 mt-1"
                    >
                      {errors.cardNumber.message}
                    </motion.p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Expiry Month</Label>
                    <Input
                      id="expiryMonth"
                      placeholder="MM"
                      className={
                        errors.expiryMonth
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("expiryMonth")}
                    />
                    {errors.expiryMonth && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.expiryMonth.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Expiry Year</Label>
                    <Input
                      id="expiryYear"
                      placeholder="YY"
                      className={
                        errors.expiryYear
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("expiryYear")}
                    />
                    {errors.expiryYear && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.expiryYear.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      className={
                        errors.cardholderName
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("cardholderName")}
                    />
                    {errors.cardholderName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.cardholderName.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className={
                        errors.cvv
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                      {...register("cvv")}
                    />
                    {errors.cvv && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.cvv.message}
                      </motion.p>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewCardForm(false)}
                    className="sm:flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="paypal" className="text-center py-8">
            <Image
              src="/paypal-logo.png"
              alt="PayPal"
              width={200}
              height={60}
              className="mx-auto mb-6"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You will be redirected to PayPal to complete your payment
              securely.
            </p>
            <Button type="button" className="w-full">
              Continue with PayPal
            </Button>
          </TabsContent>

          <TabsContent value="applePay" className="text-center py-8">
            <Image
              src="/apple-pay-logo.png"
              alt="Apple Pay"
              width={200}
              height={60}
              className="mx-auto mb-6"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete your purchase with Apple Pay for a fast and secure
              checkout.
            </p>
            <Button type="button" className="w-full bg-black hover:bg-gray-900">
              <Image
                src="/apple-logo.png"
                alt="Apple"
                width={24}
                height={24}
                className="mr-2"
              />
              Pay
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="sm:flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shipping
          </Button>
          <Button type="submit" disabled={isProcessing} className="sm:flex-1">
            {isProcessing ? (
              <div className="flex items-center">
                <div className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin" />
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Place Order
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}