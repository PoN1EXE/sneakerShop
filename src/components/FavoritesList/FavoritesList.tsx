import { useState } from 'react'
import { useSneakers } from './../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useDebounce } from '../../hooks/useDebounce'

import styles from './FavoritesList.module.scss'
import { SneakerCard } from '../SneakerCard/SneakerCard'

export const FavoritesList = () => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useSneakers()
  const cartItems = useCartStore((state) => state.sneakers)
  const addToCart = useCartStore((state) => state.addToCart)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const favorites = useFavoritesStore((state) => state.favorites)
  const debouncedSearch = useDebounce(search, 500)

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка... {error.message}</div>

  const favoriteSneakers = data?.filter((sneaker) => favorites.includes(sneaker.id))
  const filteredData = favoriteSneakers?.filter((sneaker) =>
    sneaker.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div className={styles.favoritesList}>
      <div className={styles.searchContainer}>
        <h2 className={styles.title}>Избранные кроссовки</h2>
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
          <div className={styles.contentWrapper}>
            <h2 className={styles.content}>Упс, ты еще не добавил кроссовки...</h2>
          </div>
        ) : (
          <ul className={styles.grid}>
            {filteredData?.map((sneaker) => (
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
