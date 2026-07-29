import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useSneakers } from './../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import shopCartIcon from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import filledHeart from '/src/assets/headerIcon/filledHeartIcon.svg'

import styles from './FavoritesList.module.scss'

export const FavoritesList = () => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useSneakers()
  const { favorites } = useFavoritesStore()
  const debouncedSearch = useDebounce(search, 500)
  const toggleFavorites = useFavoritesStore((state) => state.toggleFavorites)
  const addToCart = useCartStore((state) => state.addToCart)

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка... {error.message}</div>

  const favoriteItems = data?.filter((sneaker) => favorites.includes(sneaker.id))
  const filteredData = favoriteItems?.filter((sneaker) => sneaker.title.toLowerCase().includes(debouncedSearch))

  return (
    <div className={styles.favoritesList}>
      <div className={styles.searchContainer}>
        <h2 className={styles.title}>Все кроссовки</h2>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.inp}
          placeholder='   Поиск...'
        />
      </div>

      <div>
        {filteredData?.length === 0 ? (
          <h2>Упс, ты еще не добавил кроссовки...</h2>
        ) : (
          <ul className={styles.grid}>
            {filteredData?.map((sneaker) => {
              const isFavorites = favorites.includes(sneaker.id)
              return (
                <li className={styles.cardItem} key={sneaker.id}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.Pic} src={sneaker.imageUrl} alt={sneaker.title} />
                    <button onClick={() => toggleFavorites(sneaker.id)} className={styles.buttonFav}>
                      <img className={styles.customImg} src={isFavorites ? filledHeart : heartIcon} alt='В избранное' />
                    </button>
                  </div>

                  <h3>{sneaker.title}</h3>
                  <div className={styles.cardFooter}>
                    <p>Цена:</p>
                    <span className={styles.price}>{sneaker.price}</span>
                    <button onClick={() => addToCart(sneaker)} className={styles.buttonAdd}>
                      <img className={styles.customImg} src={shopCartIcon} alt='Добавить в корзину' />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
