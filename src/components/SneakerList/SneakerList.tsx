import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  return (
    <div className={styles.sneakerList}>
      <div className={styles.searchContainer}>
        <h2 className={styles.title}>Все кроссовки</h2>
        <input className={styles.inp} src='/src/assets/sneakerIcon/loopIcon.png' placeholder='   Поиск...' />
      </div>
      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  )
}
