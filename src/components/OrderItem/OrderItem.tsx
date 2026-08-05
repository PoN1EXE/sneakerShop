import { useParams } from 'react-router-dom'
import { useOrdersStore } from './../../store/ordersStore'
import { formatPrice } from './../../utils/formatPrice'
import styles from './OrderItem.module.scss'

export const OrderItem = () => {
  const orders = useOrdersStore((state) => state.orders)
  const { orderId } = useParams<{ orderId: string }>()
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return <div className={styles.notFound}>Заказ не найден</div>
  }

  const subtotal = order.sneakers.reduce((sum, s) => sum + s.price * s.quantity, 0)
  const tax = subtotal * 0.05
  const total = subtotal + tax

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Заказ #{order.id}</h2>
        <span className={styles.date}>{new Date(order.date).toLocaleDateString()}</span>
      </div>

      <div className={styles.summary}>
        <span className={styles.totalLabel}>Итого</span>
        <span className={styles.totalPrice}>{formatPrice(total)}</span>
      </div>

      <ul className={styles.itemsList}>
        {order.sneakers.map((sneaker) => (
          <li key={sneaker.id} className={styles.cartItem}>
            <img className={styles.itemImage} src={sneaker.imageUrl} alt={sneaker.title} />
            <div className={styles.itemInfo}>
              <span className={styles.itemTitle}>{sneaker.title}</span>
              <span className={styles.itemPrice}>{formatPrice(sneaker.price)}</span>
              <span className={styles.itemTax}>Налог на одну пару 5%: {formatPrice(sneaker.price * 0.05)}</span>
              <span className={styles.itemQuantity}>Количество: {sneaker.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
