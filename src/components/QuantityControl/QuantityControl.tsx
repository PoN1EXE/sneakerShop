import type { CartItem } from '../../store/cartStore'
import styles from './QuantityControl.module.scss'

interface QuantityControlProps {
  sneaker: CartItem
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export const QuantityControl = ({ sneaker, incrementQuantity, decrementQuantity }: QuantityControlProps) => {
  return (
    <div className={styles.control}>
      <button
        aria-label='Уменьшить количество пар на 1'
        className={styles.controlButton}
        onClick={() => decrementQuantity(sneaker.id)}
        disabled={sneaker.quantity === 1}>
        -
      </button>
      <span className={styles.quantity}>{sneaker.quantity}</span>
      <button
        aria-label='Увеличить количество пар на 1'
        className={styles.controlButton}
        onClick={() => incrementQuantity(sneaker.id)}>
        +
      </button>
    </div>
  )
}
