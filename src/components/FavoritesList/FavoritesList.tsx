import { useState } from 'react'
import { useSneakers } from './../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useDebounce } from '../../hooks/useDebounce'

import shopCartIcon from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import filledHeart from '/src/assets/headerIcon/filledHeartIcon.svg'
import addIcon from '/src/assets/sneakerIcon/addIcon.svg'

import styles from './FavoritesList.module.scss'

export const FavoritesList = () => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useSneakers()
  const addToCart = useCartStore((state) => state.addToCart)
  const sneakers = useCartStore((state) => state.sneakers)
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
            {filteredData?.map((sneaker) => {
              const isFavorite = favorites.includes(sneaker.id)
              const isOnCart = sneakers.some((sneaker) => sneaker.id === sneaker.id)
              return (
                <li className={styles.cardSneaker} key={sneaker.id}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.productImage} src={sneaker.imageUrl} alt={sneaker.title} />
                    <button
                      onClick={() => toggleFavorite(sneaker.id)}
                      className={`${styles.buttonFav} ${isFavorite ? styles.active : ''}`}>
                      <img className={styles.customImg} src={isFavorite ? filledHeart : heartIcon} alt='В избранное' />
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
