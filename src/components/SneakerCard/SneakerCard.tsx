import type { Sneaker } from '../../mocks/sneakers'
import shopCartIcon from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import filledHeart from '/src/assets/headerIcon/filledHeartIcon.svg'
import addIcon from '/src/assets/sneakerIcon/addIcon.svg'
import styles from './SneakerCard.module.scss'

interface SneakerCardProps {
  sneaker: Sneaker
  isFavorite: boolean
  isOnCart: boolean
  onToggleFavorite: (id: string) => void
  onAddToCart: (sneaker: Sneaker) => void
}

export const SneakerCard = ({ sneaker, isFavorite, isOnCart, onToggleFavorite, onAddToCart }: SneakerCardProps) => {
  return (
    <li className={styles.cardSneaker}>
      <div className={styles.imageWrapper}>
        <img className={styles.productImage} src={sneaker.imageUrl} alt={sneaker.title} />
        <button
          onClick={() => onToggleFavorite(sneaker.id)}
          className={`${styles.buttonFav} ${isFavorite ? styles.active : ''}`}>
          <img className={styles.customImg} src={isFavorite ? filledHeart : heartIcon} alt='В избранное' />
        </button>
      </div>

      <h3 className={styles.title}>{sneaker.title}</h3>

      <div className={styles.cardFooter}>
        <span className={styles.price}>{sneaker.price} руб.</span>
        <button onClick={() => onAddToCart(sneaker)} className={`${styles.buttonAdd} ${isOnCart ? styles.active : ''}`}>
          <img className={styles.customImg} src={isOnCart ? addIcon : shopCartIcon} alt='Добавить в корзину' />
        </button>
      </div>
    </li>
  )
}
