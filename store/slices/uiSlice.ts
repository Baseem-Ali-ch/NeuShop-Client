import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  sidebarOpen: boolean
  inventoryView: "simple" | "advanced"
}

const initialState: UiState = {
  sidebarOpen: false,
  inventoryView: "simple",
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    openSidebar: (state) => {
      state.sidebarOpen = true
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false
    },
    toggleView: (state) => {
      state.inventoryView = state.inventoryView === "simple" ? "advanced" : "simple"
    },
    setView: (state, action: PayloadAction<"simple" | "advanced">) => {
      state.inventoryView = action.payload
    },
  },
})

export const { toggleSidebar, openSidebar, closeSidebar, toggleView, setView } = uiSlice.actions

export default uiSlice.reducer
