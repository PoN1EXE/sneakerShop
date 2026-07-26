import shopCart from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import humanIcon from '/src/assets/headerIcon/heartIcon.png'
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
          <img src={shopCart} alt='Корзина' />
          <span>Корзина</span>
        </button>
        <Link to='/favorites' className={styles.iconLink}>
          <img src={heartIcon} alt='Закладки' />
          <span>Закладки</span>
        </Link>
        <Link to='/profile' className={styles.iconLink}>
          <img src={humanIcon} alt='Профиль' />
          <span>Профиль</span>
        </Link>
      </div>
    </header>
  )
}
