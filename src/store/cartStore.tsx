import { create } from 'zustand'
import type { Sneaker } from '../mocks/sneakers'

export interface CartStore {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (item: Sneaker) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  items: Sneaker[]
}

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  items: [],

  openCart: () => set({ isCartOpen: true }),

  closeCart: () => set({ isCartOpen: false }),

  addToCart: (item: Sneaker) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [] }),
}))
