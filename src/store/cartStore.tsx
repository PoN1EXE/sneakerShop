import { create } from 'zustand'
import type { Sneaker } from '../mocks/sneakers'

export interface CartStore {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (sneaker: Sneaker) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  sneakers: CartItem[]
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export interface CartItem extends Sneaker {
  quantity: number
}

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  sneakers: [],

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (sneaker) =>
    set((state) => {
      const existingItem = state.sneakers.find((i) => i.id === sneaker.id)
      if (existingItem) {
        return {
          sneakers: state.sneakers.map((i) => (i.id === sneaker.id ? { ...i, quantity: i.quantity + 1 } : i)),
        }
      }
      return {
        sneakers: [...state.sneakers, { ...sneaker, quantity: 1 }],
      }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      sneakers: state.sneakers.filter((sneaker) => sneaker.id !== id),
    })),

  incrementQuantity: (id) =>
    set((state) => ({
      sneakers: state.sneakers.map((sneaker) =>
        sneaker.id === id ? { ...sneaker, quantity: sneaker.quantity + 1 } : sneaker
      ),
    })),

  decrementQuantity: (id) =>
    set((state) => {
      const existingItem = state.sneakers.find((sneaker) => sneaker.id === id)
      if (!existingItem) return state
      if (existingItem.quantity === 1) {
        return {
          sneakers: state.sneakers.filter((sneaker) => sneaker.id !== id),
        }
      }
      return {
        sneakers: state.sneakers.map((sneaker) =>
          sneaker.id === id ? { ...sneaker, quantity: sneaker.quantity - 1 } : sneaker
        ),
      }
    }),

  clearCart: () => set({ sneakers: [] }),
}))
