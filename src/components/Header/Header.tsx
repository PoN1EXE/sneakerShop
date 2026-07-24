import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.mainImg} src='/src/assets/headerIcon/logoHeader.png' alt='Кроссовочки' />
      <h1>REACT SNEAKERS</h1>
      <h3>Магазин лучших кроссовок</h3>
      <Link to='./'>
        <img className={styles.cartImg} src='/src/assets/headerIcon/shopCart.png' />
        Корзина
      </Link>
      <Link to='./Favorites'>
        <img className={styles.heartImg} src='/src/assets/headerIcon/heartIcon.png' />
        Закладки
      </Link>
      <Link to='./User'>
        <img className={styles.humanImg} src='/src/assets/headerIcon/humanIcon.png' />
        Профиль
      </Link>
    </div>
  )
}
