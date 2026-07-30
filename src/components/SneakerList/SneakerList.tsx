import { useState } from 'react'
import { useSneakers } from '../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useDebounce } from '../../hooks/useDebounce'
import { SneakerCard } from '../SneakerCard/SneakerCard'
import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, isError, error } = useSneakers()
  const cartItems = useCartStore((state) => state.sneakers)
  const addToCart = useCartStore((state) => state.addToCart)
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>
  if (isError) return <div className={styles.error}>Ошибка: {error.message}</div>

  const filteredData = data?.filter((sneaker) => sneaker.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return (
    <div className={styles.sneakerList}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Все кроссовки</h1>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          placeholder='   Поиск...'
        />
      </div>

      <div>
        {filteredData?.length === 0 ? (
          <h2 className={styles.empty}>Упс, таких кроссовок нет...</h2>
        ) : (
          <ul className={styles.grid}>
            {filteredData?.map((sneaker) => (
              <SneakerCard
                key={sneaker.id}
                sneaker={sneaker}
                isFavorite={favorites.includes(sneaker.id)}
                isOnCart={cartItems.some((item) => item.id === sneaker.id)}
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
