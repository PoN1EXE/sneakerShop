import type { CartItem } from '../../store/cartStore'
import styles from './QuantityControl.module.scss'

interface QuantityControlProps {
  item: CartItem
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export const QuantityControl = ({ item, incrementQuantity, decrementQuantity }: QuantityControlProps) => {
  return (
    <div className={styles.control}>
      <button className={styles.btn} onClick={() => decrementQuantity(item.id)} disabled={item.quantity === 1}>
        −
      </button>
      <span className={styles.quantity}>{item.quantity}</span>
      <button className={styles.btn} onClick={() => incrementQuantity(item.id)}>
        +
      </button>
    </div>
  )
}
