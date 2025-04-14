import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ProductState {
  selectedProducts: number[]
}

const initialState: ProductState = {
  selectedProducts: [],
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProducts: (state, action: PayloadAction<number[]>) => {
      state.selectedProducts = action.payload
    },
  },
})

export const { setSelectedProducts } = productSlice.actions

export default productSlice.reducer
