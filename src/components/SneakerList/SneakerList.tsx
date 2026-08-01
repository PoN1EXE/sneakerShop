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
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, isError, error } = useSneakers()
  const cartItems = useCartStore((state) => state.sneakers)
  const addToCart = useCartStore((state) => state.addToCart)
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>
  if (isError) return <div className={styles.error}>Ошибка: {error.message}</div>

  const filteredData = data?.filter((sneaker) => sneaker.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  const sortedData = [...(filteredData || [])].sort((a, b) => {
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
