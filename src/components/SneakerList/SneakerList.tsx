import { useState } from 'react'
import { useSneakers } from './../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useDebounce } from '../../hooks/useDebounce'
import shopCartIcon from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import filledHeart from '/src/assets/headerIcon/filledHeartIcon.svg'
import addIcon from '/src/assets/sneakerIcon/addIcon.svg'

import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, isError, error } = useSneakers()
  const items = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addToCart)
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorites = useFavoritesStore((state) => state.toggleFavorites)

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка... {error.message}</div>

  const filteredData = data?.filter((sneaker) => sneaker.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return (
    <div className={styles.sneakerList}>
      <div className={styles.searchContainer}>
        <h1>Все кроссовки</h1>
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
          <h2>Упс, таких кроссовок нет...</h2>
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
