"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
    }, 300);
  };

  const subtotal = item.price * item.quantity;

  return (
    <motion.div
      animate={
        isRemoving ? { opacity: 0, height: 0, marginBottom: 0 } : { opacity: 1 }
      }
      transition={{ duration: 0.3 }}
      className="relative bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-700 p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="relative w-full sm:w-24 h-24 bg-[#FFD700] border-2 border-black dark:border-gray-700 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_API}${
              item.image || "/placeholder.svg"
            }`}
            alt={item.name}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <Link
                href={`/products/${item.id}`}
                className="text-lg font-bold text-gray-900 dark:text-white hover:underline"
              >
                {item.name}
              </Link>
              {(item.color || item.size) && (
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.color && (
                    <div className="flex items-center gap-1">
                      <span>Color:</span>
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  )}
                  {item.size && <div>Size: {item.size}</div>}
                </div>
              )}
            </div>
            <div className="mt-2 sm:mt-0 text-lg font-bold text-gray-900 dark:text-white">
              ${item.price.toFixed(2)}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Quantity Adjuster */}
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 flex items-center justify-center bg-[#FF6B6B] text-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF5252] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(Number.parseInt(e.target.value) || 1)
                }
                className="w-12 h-8 mx-1 text-center border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-[#4CAF50] text-white border-2 border-black hover:bg-[#43A047] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Subtotal and Remove */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </div>
              <button
                onClick={handleRemove}
                className="p-2 bg-[#FF6B6B] text-white border-2 border-black hover:bg-[#FF5252] transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
