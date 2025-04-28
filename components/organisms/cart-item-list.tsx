"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { RootState } from "@/store/store";
import { updateItemQuantity, removeItem } from "@/store/slices/cartSlice";

export default function CartItemList() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = async (
    id: string,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    dispatch(updateItemQuantity({ id, quantity, color, size }));
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({ id, quantity, color, size }),
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveItem = async (
    id: string,
    color?: string,
    size?: string
  ) => {
    dispatch(removeItem({ id, color, size }));
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
        body: JSON.stringify({ id, color, size }),
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={`${item.id}-${item.color || ""}-${item.size || ""}`}
          className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="relative w-20 h-20">
            <Image
              src={item.productId.images[0]} // Access the first image from the product field
              alt={item.productId.name} // Access the name from the product field
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {item.productId.name} {/* Access the name from the product field */}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.color && `Color: ${item.color}`}
              {item.color && item.size && " | "}
              {item.size && `Size: ${item.size}`}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              ${item.productId.price?.toFixed(2)} x {item.quantity} = $
              {(item.productId.price * item.quantity)?.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.quantity - 1,
                  item.color,
                  item.size
                )
              }
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  item.quantity + 1,
                  item.color,
                  item.size
                )
              }
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleRemoveItem(item.id, item.color, item.size)}
              className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
