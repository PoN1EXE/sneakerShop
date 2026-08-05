import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { useCartStore } from '../store/cartStore'
import { useFavoritesStore } from '../store/favoritesStore'
import { useOrdersStore } from '../store/ordersStore'

afterEach(() => {
  useCartStore.setState({
    isCartOpen: false,
    sneakers: [],
  })

  useFavoritesStore.setState({
    favorites: [],
  })

  useOrdersStore.setState({
    orders: [],
  })

  localStorage.clear()
})
