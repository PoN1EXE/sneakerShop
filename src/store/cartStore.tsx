import { create } from 'zustand'
import type { Sneaker } from '../mocks/sneakers'

export interface CartStore {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (item: Sneaker) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  items: CartItem[]
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export interface CartItem extends Sneaker {
  quantity: number
}

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  items: [],

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
        }
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  incrementQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    })),

  decrementQuantity: (id) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id)
      if (!existingItem) return state
      if (existingItem.quantity === 1) {
        return {
          items: state.items.filter((item) => item.id !== id),
        }
      }
      return {
        items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)),
      }
    }),

  clearCart: () => set({ items: [] }),
}))
