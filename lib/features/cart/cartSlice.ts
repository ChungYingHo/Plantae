import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  name: string
  quantity: number
  unit: string
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { name, quantity, unit } = action.payload
      const existingItem = state.items.find((item) => item.name === name)
      if (existingItem) {
        existingItem.quantity = quantity
        existingItem.unit = unit
      } else {
        state.items.push({ name, quantity, unit })
      }
    },
    removeFromCart: (state, action: PayloadAction<{ name: string }>) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      )
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      const { name, quantity } = action.payload
      const existingItem = state.items.find((item) => item.name === name)
      if (existingItem) {
        existingItem.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
