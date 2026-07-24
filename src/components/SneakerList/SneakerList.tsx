import { useState } from 'react'
import { useSneakers } from './../../hooks/useSneakers'
import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useSneakers()

  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка... {error.message}</div>

  const filteredData = data?.filter((sneaker) => sneaker.title.toLowerCase().includes(search.toLowerCase()))

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
        <ul className={styles.grid}>
          {filteredData?.map((sneaker) => (
            <li className={styles.cardItem} key={sneaker.id}>
              <img className={styles.Pic} src={sneaker.imageUrl} />
              <h3>{sneaker.title}</h3>
              <p>{sneaker.price}</p>
              <div className={styles.buttonContainer}>
                <button className={styles.buttonFav}>
                  <img className={styles.customImg} src='/src/assets/headerIcon/heartIcon.png' />
                </button>
                <button className={styles.buttonAdd}>
                  <img className={styles.customImg} src='/src/assets/headerIcon/shopCart.png' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
