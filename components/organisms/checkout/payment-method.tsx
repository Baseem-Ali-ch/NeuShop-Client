"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, Lock, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, {
      message:
        "Card number must be 16 digits in the format XXXX XXXX XXXX XXXX",
    })
    .transform((value) => value.replace(/\s+/g, "")), // Remove spaces for further processing
  cardName: z.string().min(1, { message: "Cardholder name is required" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
  sameAsShipping: z.boolean().optional(),
  paymentMethod: z.enum(["creditCard", "paypal", "applePay"]),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentMethodProps {
  paymentInfo: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    sameAsShipping: boolean;
    paymentMethod: string;
  };
  setPaymentInfo: (info: any) => void;
  shippingInfo: {
    address: string;
    apartment: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  onBack: () => void;
}

export default function PaymentMethod({
  paymentInfo,
  setPaymentInfo,
  shippingInfo,
  onBack,
}: PaymentMethodProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [cardType, setCardType] = useState<string>("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const total = useSelector((state: RootState) => state.cart.total);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      ...paymentInfo,
      paymentMethod: paymentInfo.paymentMethod as
        | "creditCard"
        | "paypal"
        | "applePay",
    },
  });

  const watchSameAsShipping = watch("sameAsShipping");
  const watchPaymentMethod = watch("paymentMethod");

  const orderDetails = () => {
    // Redirect to order details page
    window.location.href = "/account?section=orders";
  };

  const onSubmit = async (data: PaymentFormValues) => {
    setIsProcessing(true);

    try {
      // Combine payment info, shipping info, and other order details
      const orderData = {
        paymentInfo: data,
        shippingInfo,
        items: cartItems,
        subtotal: subtotal,
        total: total,
        tax: subtotal * 0.08,
      };

      // Send the order data to the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/place-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      const result = await response.json();
      console.log("Order saved successfully:", result);

      // Mark the order as complete
      setPaymentInfo(data);
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

  // Format expiry date as user types
  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 2) {
      return digits;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
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
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="cardNumber">Card Information</Label>
              <div className="flex space-x-2">
                <Image
                  src="/stylized-payment-network.png"
                  alt="Visa"
                  width={36}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/interlocking-circles.png"
                  alt="Mastercard"
                  width={36}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/amex-card-close-up.png"
                  alt="American Express"
                  width={36}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/abstract-geometric-logo.png"
                  alt="Discover"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
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
                        src={`/placeholder.svg?height=20&width=32&query=${cardType}+logo`}
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
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    className={
                      errors.expiryDate
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                    {...register("expiryDate", {
                      onChange: (e) => {
                        e.target.value = formatExpiryDate(e.target.value);
                      },
                    })}
                  />
                  {errors.expiryDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 mt-1"
                    >
                      {errors.expiryDate.message}
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  className={
                    errors.cardName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("cardName")}
                />
                {errors.cardName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {errors.cardName.message}
                  </motion.p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="paypal" className="text-center py-8">
            <Image
              src="/paypal-logo-closeup.png"
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
              src="/contactless-payment-symbols.png"
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
                src="/white-apple-logo.png"
                alt="Apple"
                width={24}
                height={24}
                className="mr-2"
              />
              Pay
            </Button>
          </TabsContent>
        </Tabs>

        {watchPaymentMethod === "creditCard" && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="sameAsShipping"
                checked={watchSameAsShipping}
                onCheckedChange={(checked) =>
                  setValue("sameAsShipping", checked as boolean)
                }
              />
              <Label
                htmlFor="sameAsShipping"
                className="text-sm font-normal cursor-pointer"
              >
                Billing address is the same as shipping address
              </Label>
            </div>

            {!watchSameAsShipping && (
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Billing Address
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please enter your billing address.
                </p>
                {/* Billing address form fields would go here */}
              </div>
            )}
          </div>
        )}

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
