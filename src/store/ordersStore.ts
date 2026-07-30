import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './cartStore'

export interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
}
export interface Order {
  id: string | number
  sneakers: CartItem[]
  total: number
  date: number
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (newOrder) =>
        set((state) => ({
          orders: [...state.orders, newOrder],
        })),
    }),
    {
      name: 'ordersStorage',
    }
  )
)
