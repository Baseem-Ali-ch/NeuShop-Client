import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface OrderState {
  selectedOrders: string[]
  statusFilter: string
  advancedFilters: {
    customerSearch: string
    paymentMethod: string
    fulfillmentStatus: string
    minPrice: string
    maxPrice: string
  }
}

const initialState: OrderState = {
  selectedOrders: [],
  statusFilter: "all",
  advancedFilters: {
    customerSearch: "",
    paymentMethod: "",
    fulfillmentStatus: "",
    minPrice: "",
    maxPrice: "",
  },
}

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      if (!state.selectedOrders.includes(action.payload)) {
        state.selectedOrders.push(action.payload)
      }
    },
    deselectOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrders = state.selectedOrders.filter((id) => id !== action.payload)
    },
    selectAllOrders: (state) => {
      // In a real app, you would get all visible order IDs based on filters
      // For this example, we'll just use a placeholder
      state.selectedOrders = [
        "ORD-7352",
        "ORD-6291",
        "ORD-5183",
        "ORD-4072",
        "ORD-3961",
        "ORD-2850",
        "ORD-1749",
        "ORD-0638",
      ]
    },
    deselectAllOrders: (state) => {
      state.selectedOrders = []
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setAdvancedFilters: (state, action: PayloadAction<any>) => {
      state.advancedFilters = action.payload
    },
    clearFilters: (state) => {
      state.advancedFilters = {
        customerSearch: "",
        paymentMethod: "",
        fulfillmentStatus: "",
        minPrice: "",
        maxPrice: "",
      }
    },
  },
})

export const {
  selectOrder,
  deselectOrder,
  selectAllOrders,
  deselectAllOrders,
  setStatusFilter,
  setAdvancedFilters,
  clearFilters,
} = orderSlice.actions

export const selectSelectedOrders = (state: RootState) => state.orders.selectedOrders
export const selectStatusFilter = (state: RootState) => state.orders.statusFilter
export const selectAdvancedFilters = (state: RootState) => state.orders.advancedFilters

export default orderSlice.reducer
