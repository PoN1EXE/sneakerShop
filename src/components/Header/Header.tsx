import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useCartStore } from '../../store/cartStore'

export const Header = () => {
  const openModal = useCartStore((state) => state.openCart)

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
        <button onClick={openModal} className={styles.iconLink}>
          <img src='/src/assets/headerIcon/shopCart.png' alt='Корзина' />
          <span>Корзина</span>
        </button>
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
