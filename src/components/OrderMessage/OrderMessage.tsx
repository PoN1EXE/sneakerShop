import styles from './OrderMessage.module.scss'

export interface OrderMessageProps {
  orderId: string
  onClose: () => void
  onNavigateToOrders: () => void
}

export const OrderMessage = ({ orderId, onClose, onNavigateToOrders }: OrderMessageProps) => {
  return (
    <div className={styles.orderMessage}>
      <h2 className={styles.title}>Заказ успешно оформлен!</h2>
      <p className={styles.subtitle}>Номер вашего заказа:</p>
      <span className={styles.orderNumber}>#{orderId}</span>
      <div className={styles.buttons}>
        <button className={styles.buttonPrimary} onClick={onNavigateToOrders}>
          Перейти к заказам
        </button>
        <button className={styles.buttonSecondary} onClick={onClose}>
          Продолжить покупки
        </button>
      </div>
    </div>
  )
}
