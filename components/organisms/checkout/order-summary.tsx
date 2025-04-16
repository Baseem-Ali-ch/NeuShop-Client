"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState } from "@/store/store";
import { updateTotals } from "@/store/slices/cartSlice";

interface OrderSummaryProps {
  subtotal: number;
  shippingMethod: string;
}

export default function OrderSummary({
  subtotal,
  shippingMethod,
}: OrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate shipping cost based on selected method
  const getShippingCost = () => {
    switch (shippingMethod) {
      case "express":
        return 12.99;
      case "nextDay":
        return 19.99;
      case "standard":
      default:
        return subtotal >= 100 ? 0 : 5.99;
    }
  };

  // Calculate tax (example: 8%)
  const tax = subtotal * 0.08;

  // Calculate total
  const total = subtotal + getShippingCost() + tax;

//   useEffect(() => {
//     dispatch(updateTotals({ subtotal, total: subtotal + getShippingCost() + tax }));
// }, [dispatch, subtotal]);

  // Auto-expand on desktop, collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      {/* Summary Header - Always visible */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left lg:cursor-default"
        >
          <h2 className="text-xl font-light text-gray-900 dark:text-white">
            Order Summary
          </h2>
          <div className="lg:hidden">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </button>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cart Items */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.color || ""}-${item.size || ""}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
                          item.image || "/placeholder.svg"
                        }`}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                      <div className="absolute top-0 right-0 bg-gray-900 dark:bg-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-md">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h4>
                      {(item.color || item.size) && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.color && (
                            <span className="inline-flex items-center mr-2">
                              Color:{" "}
                              <span
                                className="inline-block w-3 h-3 ml-1 rounded-full border border-gray-300 dark:border-gray-600"
                                style={{ backgroundColor: item.color }}
                              />
                            </span>
                          )}
                          {item.size && <span>Size: {item.size}</span>}
                        </p>
                      )}
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    ${subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {getShippingCost() === 0
                      ? "Free"
                      : `$${getShippingCost().toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
