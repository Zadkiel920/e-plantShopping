import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((p) => p.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter((p) => p.name !== itemName);
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const selected = state.items.find((p) => p.name === name);

      if (selected) {
        selected.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
