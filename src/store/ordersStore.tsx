import { create } from 'zustand'
import type { CartItem } from './cartStore'

export interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
}
export interface Order {
  id: string | number
  items: CartItem[]
  total: number
  date: string
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],

  addOrder: (newOrder) =>
    set((state) => ({
      orders: [...state.orders, newOrder],
    })),
}))
