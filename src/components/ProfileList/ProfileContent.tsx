import { useOrdersStore } from '../../store/ordersStore'
import userIcon from '/src/assets/profileIcon/userProfile.svg'
import styles from './ProfileContent.module.scss'

export const ProfileContent = () => {
  const orders = useOrdersStore((state) => state.orders)
  console.log(
    'Заказы:',
    orders.map((o) => ({ date: o.date, type: typeof o.date }))
  )
  return (
    <div className={styles.profileList}>
      <div className={styles.userInfo}>
        <img src={userIcon} alt='Аватар' className={styles.avatar} />
        <p>Фамилия Имя</p>
        <p>номер телефона</p>
        <p>Почта</p>
      </div>

      <div>
        <h2 className={styles.title}>Все кроссовки</h2>

        {orders.length === 0 ? (
          <div className={styles.contentWrapper}>
            <h2>Упс, ты еще не покупал кроссовки...</h2>
          </div>
        ) : (
          <ul className={styles.grid}>
            {orders.map((order) => (
              <li key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span>Дата: {new Date(order.date).toLocaleDateString()}</span>

                  <span>Сумма: {order.total} руб.</span>
                </div>

                <ul className={styles.itemsList}>
                  {order.sneakers.map((sneaker) => (
                    <li key={sneaker.id} className={styles.cartItem}>
                      <img className={styles.itemImage} src={sneaker.imageUrl} alt={sneaker.title} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{sneaker.title}</span>
                        <span className={styles.itemPrice}>{sneaker.price} руб.</span>
                        <span className={styles.itemQuantity}>Количество: {sneaker.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
