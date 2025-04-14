"use client"

import { useSelector } from "react-redux"
import CartItem from "@/components/molecules/cart-item"
import type { RootState } from "@/store/store"
import { motion } from "framer-motion"

export default function CartItemList() {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  return (
    <div className="space-y-6">
      {cartItems.map((item, index) => (
        <motion.div
          key={`${item.id}-${item.color || ""}-${item.size || ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CartItem item={item} />
        </motion.div>
      ))}
    </div>
  )
}
