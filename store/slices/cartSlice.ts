import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface CartItem {
  id: string;
  quantity: number;
  color?: string;
  size?: string;
  productId: {
    name: string;
    price: number;
    images: string[];
  };
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number; color?: string; size?: string }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i !== item);
        }
        state.total = state.items.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; color?: string; size?: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          )
      );
      state.total = state.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.total = action.payload.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;