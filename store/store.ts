import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import customerReducer from "./slices/customerSlice"
import inventoryReducer from "./slices/inventorySlice"
import marketingReducer from "./slices/marketingSlice"
import orderReducer from "./slices/orderSlice"
import productReducer from "./slices/productSlice"
import settingsReducer from "./slices/settingsSlice"
import uiReducer from "./slices/uiSlice"
import reportsReducer from "./slices/reportsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    customers: customerReducer,
    inventory: inventoryReducer,
    marketing: marketingReducer,
    orders: orderReducer,
    products: productReducer,
    settings: settingsReducer,
    ui: uiReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
