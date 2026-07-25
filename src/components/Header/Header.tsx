import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to='/'>
          <div className={styles.logoRaw}>
            <img className={styles.mainImg} src='/src/assets/headerIcon/logoHeader.png' alt='Кроссовочки' />
            <div className={styles.textBlock}>
              <h1>REACT SNEAKERS</h1>
              <h3>Магазин лучших кроссовок</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Link to='/cart' className={styles.iconLink}>
          <img src='/src/assets/headerIcon/shopCart.png' alt='Корзина' />
          <span>Корзина</span>
        </Link>
        <Link to='/favorites' className={styles.iconLink}>
          <img src='/src/assets/headerIcon/heartIcon.png' alt='Закладки' />
          <span>Закладки</span>
        </Link>
        <Link to='/profile' className={styles.iconLink}>
          <img src='/src/assets/headerIcon/humanIcon.png' alt='Профиль' />
          <span>Профиль</span>
        </Link>
      </div>
    </header>
  )
}
