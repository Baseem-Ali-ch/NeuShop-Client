import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { mockInventory } from "@/data/mock-inventory"

export interface InventoryProduct {
  id: string
  name: string
  sku: string
  categoryId: string
  stockLevel: number
  lowStockThreshold: number
  reorderPoint: number
  price: number
  cost: number
  location: string
  lastRestocked: string
  supplier: string
}

interface InventoryState {
  products: InventoryProduct[]
  loading: boolean
  error: string | null
}

const initialState: InventoryState = {
  products: mockInventory,
  loading: false,
  error: null,
}

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    updateStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const product = state.products.find((p) => p.id === id)
      if (product) {
        product.stockLevel = quantity
      }
    },

    bulkUpdateStock: (state, action: PayloadAction<{ ids: string[]; quantity: number }>) => {
      const { ids, quantity } = action.payload
      state.products.forEach((product) => {
        if (ids.includes(product.id)) {
          product.stockLevel = quantity
        }
      })
    },

    setLowStockThreshold: (state, action: PayloadAction<{ id: string; threshold: number }>) => {
      const { id, threshold } = action.payload
      const product = state.products.find((p) => p.id === id)
      if (product) {
        product.lowStockThreshold = threshold
      }
    },

    addProduct: (state, action: PayloadAction<InventoryProduct>) => {
      state.products.push(action.payload)
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload)
    },
  },
})

export const { updateStock, bulkUpdateStock, setLowStockThreshold, addProduct, removeProduct } = inventorySlice.actions

export default inventorySlice.reducer
