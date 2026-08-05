import { describe, it, expect } from 'vitest'
import { useCartStore } from '../cartStore'

describe('useCartStore', () => {
  it('повторное добавление увеличивает количество', () => {
    const sneaker = { id: '1', title: 'Nike', price: 100, imageUrl: '', isFavorite: false, isAdded: false }
    useCartStore.getState().addToCart(sneaker)
    useCartStore.getState().addToCart(sneaker)

    const state = useCartStore.getState()
    expect(state.sneakers).toHaveLength(1)
    expect(state.sneakers[0].quantity).toBe(2)
  })

  it('увеличение количества работает', () => {
    const sneaker = { id: '1', title: 'Nike', price: 100, imageUrl: '', isFavorite: false, isAdded: false }
    useCartStore.getState().addToCart(sneaker)
    useCartStore.getState().incrementQuantity('1')

    expect(useCartStore.getState().sneakers[0].quantity).toBe(2)
  })

  it('уменьшение количества работает', () => {
    const sneaker = { id: '1', title: 'Nike', price: 100, imageUrl: '', isFavorite: false, isAdded: false }
    useCartStore.getState().addToCart(sneaker)
    useCartStore.getState().addToCart(sneaker)
    useCartStore.getState().decrementQuantity('1')

    expect(useCartStore.getState().sneakers[0].quantity).toBe(1)
  })

  it('удаление товара из корзины', () => {
    const sneaker1 = { id: '1', title: 'Nike', price: 100, imageUrl: '', isFavorite: false, isAdded: false }
    const sneaker2 = { id: '2', title: 'Adidas', price: 200, imageUrl: '', isFavorite: false, isAdded: false }
    useCartStore.getState().addToCart(sneaker1)
    useCartStore.getState().addToCart(sneaker2)
    useCartStore.getState().removeFromCart('1')

    const state = useCartStore.getState()
    expect(state.sneakers).toHaveLength(1)
    expect(state.sneakers[0].id).toBe('2')
  })

  it('очистка корзины', () => {
    const sneaker = { id: '1', title: 'Nike', price: 100, imageUrl: '', isFavorite: false, isAdded: false }
    useCartStore.getState().addToCart(sneaker)
    useCartStore.getState().clearCart()

    expect(useCartStore.getState().sneakers).toHaveLength(0)
  })
})
