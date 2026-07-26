import { useState } from 'react'
import { useSneakers } from './../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useDebounce } from '../../hooks/useDebounce'
import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { data, isLoading, isError, error } = useSneakers()
  const addToCart = useCartStore((state) => state.addToCart)

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка... {error.message}</div>

  const filteredData = data?.filter((sneaker) => sneaker.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

  return (
    <div className={styles.sneakerList}>
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
          <h1>Упс, таких кроссовок нет...</h1>
        ) : (
          <ul className={styles.grid}>
            {filteredData?.map((sneaker) => (
              <li className={styles.cardItem} key={sneaker.id}>
                <div className={styles.imageWrapper}>
                  <img className={styles.Pic} src={sneaker.imageUrl} alt={sneaker.title} />
                  <button className={styles.buttonFav}>
                    <img className={styles.customImg} src='/src/assets/headerIcon/heartIcon.png' alt='В избранное' />
                  </button>
                </div>

                <h3>{sneaker.title}</h3>
                <div className={styles.cardFooter}>
                  <p>Цена:</p>
                  <span className={styles.price}>{sneaker.price}</span>
                  <button onClick={() => addToCart(sneaker)} className={styles.buttonAdd}>
                    <img
                      className={styles.customImg}
                      src='/src/assets/headerIcon/shopCart.png'
                      alt='Добавить в корзину'
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
