import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { DateRange } from "react-day-picker"

interface ReportsState {
  dateRange: DateRange & { preset?: string }
  compareMode: boolean
  activeReportCategory: string
  groupBy: string
  viewMode: "chart" | "table"
  showFilterPanel: boolean
  isLoading: boolean
  error: string | null
}

const initialState: ReportsState = {
  dateRange: {
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
    preset: "last30Days",
  },
  compareMode: false,
  activeReportCategory: "sales",
  groupBy: "day",
  viewMode: "chart",
  showFilterPanel: false,
  isLoading: false,
  error: null,
}

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange & { preset?: string }>) => {
      state.dateRange = action.payload
    },
    toggleCompareMode: (state) => {
      state.compareMode = !state.compareMode
    },
    setActiveReportCategory: (state, action: PayloadAction<string>) => {
      state.activeReportCategory = action.payload
      state.isLoading = true
      state.error = null
      // In a real app, this would trigger a data fetch
      // For this demo, we'll simulate the loading state ending after a delay
      // This would be handled by a thunk or middleware in a real app
    },
    setGroupBy: (state, action: PayloadAction<string>) => {
      state.groupBy = action.payload
    },
    setViewMode: (state, action: PayloadAction<"chart" | "table">) => {
      state.viewMode = action.payload
    },
    toggleFilterPanel: (state) => {
      state.showFilterPanel = !state.showFilterPanel
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {
  setDateRange,
  toggleCompareMode,
  setActiveReportCategory,
  setGroupBy,
  setViewMode,
  toggleFilterPanel,
  setLoading,
  setError,
} = reportsSlice.actions

export default reportsSlice.reducer
