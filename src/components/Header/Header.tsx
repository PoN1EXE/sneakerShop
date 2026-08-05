import shopCart from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import humanIcon from '/src/assets/headerIcon/humanIcon.png'
import logoHeader from '/src/assets/headerIcon/logoHeader.png'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import styles from './Header.module.scss'

export const Header = () => {
  const openModal = useCartStore((state) => state.openCart)

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to='/'>
          <div className={styles.logoRaw}>
            <img className={styles.mainImg} src={logoHeader} alt='Кроссовочки' />
            <div className={styles.textBlock}>
              <h1>REACT SNEAKERS</h1>
              <h3>Магазин лучших кроссовок</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.headerRight}>
        <button aria-label='Корзина' onClick={openModal} className={styles.iconLink}>
          <img src={shopCart} alt='Корзина' />
          <span>Корзина</span>
        </button>
        <Link aria-label='Закладки' to='/Favorites' className={styles.iconLink}>
          <img src={heartIcon} alt='Закладки' />
          <span>Закладки</span>
        </Link>
        <Link aria-label='Профиль' to='/Profile' className={styles.iconLink}>
          <img src={humanIcon} alt='Профиль' />
          <span>Профиль</span>
        </Link>
      </div>
    </header>
  )
}
