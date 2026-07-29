import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useSneakers } from './../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import shopCartIcon from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import filledHeart from '/src/assets/headerIcon/filledHeartIcon.svg'
import addIcon from '/src/assets/sneakerIcon/addIcon.svg'

import styles from './FavoritesList.module.scss'

export const FavoritesList = () => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useSneakers()
  const { favorites } = useFavoritesStore()
  const items = useCartStore((state) => state.items)
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
        <h2 className={styles.title}>Избранные кроссовки</h2>
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
          <div className={styles.contentWrapper}>
            <h2 className={styles.content}>Упс, ты еще не добавил кроссовки...</h2>
          </div>
        ) : (
          <ul className={styles.grid}>
            {filteredData?.map((sneaker) => {
              const isFavorites = favorites.includes(sneaker.id)
              const isOnCart = items.some((item) => item.id === sneaker.id)
              return (
                <li className={styles.cardItem} key={sneaker.id}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.Pic} src={sneaker.imageUrl} alt={sneaker.title} />
                    <button
                      onClick={() => toggleFavorites(sneaker.id)}
                      className={`${styles.buttonFav} ${isFavorites ? styles.active : ''}`}>
                      <img className={styles.customImg} src={isFavorites ? filledHeart : heartIcon} alt='В избранное' />
                    </button>
                  </div>

                  <h3>{sneaker.title}</h3>
                  <div className={styles.cardFooter}>
                    <p>Цена:</p>
                    <span className={styles.price}>{sneaker.price}</span>
                    <button
                      onClick={() => addToCart(sneaker)}
                      className={`${styles.buttonAdd} ${isOnCart ? styles.active : ''}`}>
                      <img
                        className={styles.customImg}
                        src={isOnCart ? addIcon : shopCartIcon}
                        alt='Добавить в корзину'
                      />
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
