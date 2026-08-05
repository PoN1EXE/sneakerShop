import type { Sneaker } from '../../mocks/sneakers'
import { formatPrice } from './../../utils/formatPrice'
import shopCartIcon from '/src/assets/headerIcon/shopCart.png'
import heartIcon from '/src/assets/headerIcon/heartIcon.png'
import filledHeart from '/src/assets/headerIcon/filledHeartIcon.svg'
import addIcon from '/src/assets/sneakerIcon/addIcon.svg'
import styles from './SneakerCard.module.scss'

interface SneakerCardProps {
  sneaker: Sneaker
  isFavorite: boolean
  isInCart: boolean
  onToggleFavorite: (id: string) => void
  onAddToCart: (sneaker: Sneaker) => void
}

export const SneakerCard = ({ sneaker, isFavorite, isInCart, onToggleFavorite, onAddToCart }: SneakerCardProps) => {
  return (
    <li className={styles.cardSneaker}>
      <div className={styles.imageWrapper}>
        <img className={styles.productImage} src={sneaker.imageUrl} alt={sneaker.title} />
        <button
          aria-label='Добавить в избранное'
          onClick={() => onToggleFavorite(sneaker.id)}
          className={`${styles.buttonFav} ${isFavorite ? styles.active : ''}`}>
          <img className={styles.actionIcon} src={isFavorite ? filledHeart : heartIcon} alt='Добавить в избранное' />
        </button>
      </div>

      <h3 className={styles.title}>{sneaker.title}</h3>

      <div className={styles.cardFooter}>
        <span className={styles.price}>{formatPrice(sneaker.price)}</span>
        <button
          aria-label='Добавить в корзину'
          onClick={() => onAddToCart(sneaker)}
          className={`${styles.buttonAdd} ${isInCart ? styles.active : ''}`}>
          <img className={styles.actionIcon} src={isInCart ? addIcon : shopCartIcon} alt='Добавить в корзину' />
        </button>
      </div>
    </li>
  )
}
