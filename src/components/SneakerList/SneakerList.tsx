import { useState } from 'react'
import { useSneakers } from '../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useDebounce } from '../../hooks/useDebounce'
import { SneakerCard } from '../SneakerCard/SneakerCard'
import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  const [search, setSearch] = useState('')
  const [sortOptions, setSortOptions] = useState<'price-low' | 'price-high' | 'name-asc' | 'name-desc'>('price-low')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, isError, error } = useSneakers()
  const cartItems = useCartStore((state) => state.sneakers)
  const addToCart = useCartStore((state) => state.addToCart)
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>
  if (isError) return <div className={styles.error}>Ошибка: {error.message}</div>

  const filteredData = data?.filter((sneaker) => sneaker.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  const priceFilteredData = filteredData?.filter((sneaker) => {
    const price = sneaker.price
    if (minPrice !== '' && price < Number(minPrice)) return false
    if (maxPrice !== '' && price > Number(maxPrice)) return false
    return true
  })

  const sortedData = [...(priceFilteredData || [])].sort((a, b) => {
    switch (sortOptions) {
      case 'price-low':
        return a.price - b.price

      case 'price-high':
        return b.price - a.price

      case 'name-asc':
        return b.title.localeCompare(a.title)

      case 'name-desc':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setMinPrice('')
      return
    }

    const num = Number(value)
    if (num < 0) {
      setMinPrice('0')
    } else {
      setMinPrice(value)
    }
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setMaxPrice('')
      return
    }

    const num = Number(value)
    if (num < 0) {
      setMaxPrice('0')
    } else {
      setMaxPrice(value)
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOptions(e.target.value as typeof sortOptions)
  }

  return (
    <div className={styles.sneakerList}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Все кроссовки</h1>
        <div className={styles.rightGroup}>
          <select className={styles.sortSelect} onChange={handleSortChange} value={sortOptions}>
            <option value='name-desc'>Сначала A-Z</option>
            <option value='name-asc'>Сначала Z-A</option>
            <option value='price-high'>Сначала дорогие</option>
            <option value='price-low'>Сначала дешёвые</option>
          </select>

          <input
            type='number'
            className={styles.priceInput}
            placeholder='Цена от'
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type='number'
            className={styles.priceInput}
            placeholder='Цена до'
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            placeholder='   Поиск...'
          />
        </div>
      </div>

      <div>
        {sortedData?.length === 0 ? (
          <h2 className={styles.empty}>Упс, таких кроссовок нет...</h2>
        ) : (
          <ul className={styles.grid}>
            {sortedData?.map((sneaker) => (
              <SneakerCard
                key={sneaker.id}
                sneaker={sneaker}
                isFavorite={favorites.includes(sneaker.id)}
                isInCart={cartItems.some((item) => item.id === sneaker.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
