import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string | number
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
  size?: string
  color?: string
}

interface CartState {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  discount: number
  couponCode: string | null
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  discount: 0,
  couponCode: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.variant === action.payload.variant &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      // Recalculate totals
      state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.tax = state.subtotal * 0.1 // Assuming 10% tax
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)

      // Recalculate totals
      state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.tax = state.subtotal * 0.1 // Assuming 10% tax
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }

      // Recalculate totals
      state.subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      state.tax = state.subtotal * 0.1 // Assuming 10% tax
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },
    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.tax = 0
      state.total = 0
      state.discount = 0
      state.couponCode = null
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.couponCode = action.payload.code
      state.discount = action.payload.discount
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },
    updateShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload
      state.total = state.subtotal + state.shipping + state.tax - state.discount
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart, applyCoupon, updateShipping } = cartSlice.actions

export default cartSlice.reducer
