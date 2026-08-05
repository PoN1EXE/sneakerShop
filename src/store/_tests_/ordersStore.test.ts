import { describe, it, expect } from 'vitest'
import { useOrdersStore } from '../ordersStore'

describe('useOrdersStore', () => {
  it('расчёт суммы заказа', () => {
    const order = {
      id: '1',
      sneakers: [
        { id: '1', title: 'Nike', price: 100, quantity: 2, imageUrl: '', isFavorite: false, isAdded: false },
        { id: '2', title: 'Adidas', price: 200, quantity: 1, imageUrl: '', isFavorite: false, isAdded: false },
      ],
      total: 400,
      date: Date.now(),
    }

    useOrdersStore.getState().addOrder(order)

    const savedOrder = useOrdersStore.getState().orders[0]
    const calculatedTotal = savedOrder.sneakers.reduce((sum, s) => sum + s.price * s.quantity, 0)
    expect(calculatedTotal).toBe(400)
  })
})
