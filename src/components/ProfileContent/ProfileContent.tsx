import { useOrdersStore } from '../../store/ordersStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { useShallow } from 'zustand/shallow'
import { ProfileModal } from '../ProfileModal/ProfileModal'
import { formatPrice } from './../../utils/formatPrice'
import userIcon from '/src/assets/profileIcon/userProfile.svg'
import styles from './ProfileContent.module.scss'

export const ProfileContent = () => {
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()
  const orders = useOrdersStore((state) => state.orders)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortOrder === 'newest') return b.date - a.date
    return a.date - b.date
  })

  const handleOrderDetails = (id: string) => {
    navigate(`/Profile/${id}`)
  }

  const { openProfileEdit } = useUserStore(
    useShallow((state) => ({
      openProfileEdit: state.openProfileEdit,
    }))
  )

  return (
    <div className={styles.profileContent}>
      <div className={styles.userInfo}>
        <img src={userIcon} alt='Аватар' className={styles.avatar} />
        <p>{user.name}</p>
        <p>{user.phone}</p>
        <p>{user.email}</p>
        <button aria-label='Редактировать профиль' className={styles.orderButton} onClick={openProfileEdit}>
          Редактировать профиль
        </button>
      </div>

      <div>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Все кроссовки</h2>
          <button
            aria-label='Сортировка'
            className={styles.sortButton}
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>
            <span className={styles.arrow}>{sortOrder === 'newest' ? '↓' : '↑'}</span>
            {sortOrder === 'newest' ? 'Сначала новые' : 'Сначала старые'}
          </button>
        </div>

        {sortedOrders.length === 0 ? (
          <div className={styles.contentWrapper}>
            <h2>Упс, ты еще не покупал кроссовки...</h2>
          </div>
        ) : (
          <ul className={styles.grid}>
            {sortedOrders.map((order) => (
              <li key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span>Дата: {new Date(order.date).toLocaleDateString()}</span>
                  <span>Сумма: {formatPrice(order.total)}</span>
                  <button
                    aria-label='Перейти к заказу'
                    className={styles.orderButton}
                    onClick={() => handleOrderDetails(String(order.id))}>
                    Перейти к заказу
                  </button>
                </div>

                <ul className={styles.itemsList}>
                  {order.sneakers.map((sneaker) => (
                    <li key={sneaker.id} className={styles.cartItem}>
                      <img className={styles.itemImage} src={sneaker.imageUrl} alt={sneaker.title} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{sneaker.title}</span>
                        <span className={styles.itemPrice}>{formatPrice(sneaker.price)}</span>
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
      <ProfileModal />
    </div>
  )
}
