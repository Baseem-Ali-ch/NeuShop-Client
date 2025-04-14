import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { mockCustomers } from "@/data/mock-customers"

interface CustomerState {
  customers: typeof mockCustomers
  filteredCustomers: typeof mockCustomers
  selectedCustomers: string[]
  loading: boolean
  error: string | null
  filters: {
    search: string
    dateRange: {
      from: Date | null
      to: Date | null
    }
    status: string
    group: string
    spendingRange: [number, number]
    ordersRange: [number, number]
  }
  sort: {
    field: string
    direction: "asc" | "desc"
  }
}

const initialState: CustomerState = {
  customers: mockCustomers,
  filteredCustomers: mockCustomers,
  selectedCustomers: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    dateRange: {
      from: null,
      to: null,
    },
    status: "all",
    group: "all",
    spendingRange: [0, 2000],
    ordersRange: [0, 100],
  },
  sort: {
    field: "name",
    direction: "asc",
  },
}

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload
      ;(state.filters as any)[key] = value
      // In a real app, we would apply the filters here
    },
    setSort: (state, action: PayloadAction<{ field: string; direction: "asc" | "desc" }>) => {
      state.sort = action.payload
      // In a real app, we would apply the sort here
    },
    selectCustomer: (state, action: PayloadAction<string>) => {
      if (!state.selectedCustomers.includes(action.payload)) {
        state.selectedCustomers.push(action.payload)
      }
    },
    deselectCustomer: (state, action: PayloadAction<string>) => {
      state.selectedCustomers = state.selectedCustomers.filter((id) => id !== action.payload)
    },
    selectAllCustomers: (state, action: PayloadAction<string[]>) => {
      state.selectedCustomers = action.payload
    },
    deselectAllCustomers: (state) => {
      state.selectedCustomers = []
    },
  },
})

export const {
  setLoading,
  setError,
  setFilter,
  setSort,
  selectCustomer,
  deselectCustomer,
  selectAllCustomers,
  deselectAllCustomers,
} = customerSlice.actions

export const selectCustomers = (state: RootState) => state.customers.customers
export const selectFilteredCustomers = (state: RootState) => state.customers.filteredCustomers
export const selectCustomerLoading = (state: RootState) => state.customers.loading
export const selectCustomerError = (state: RootState) => state.customers.error
export const selectCustomerFilters = (state: RootState) => state.customers.filters
export const selectCustomerSort = (state: RootState) => state.customers.sort
export const selectSelectedCustomers = (state: RootState) => state.customers.selectedCustomers

export default customerSlice.reducer
