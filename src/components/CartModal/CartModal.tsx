import { useEffect, useState, useCallback } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useShallow } from 'zustand/shallow'
import { QuantityControl } from '../QuantityControl/QuantityControl'
import { useOrdersStore } from '../../store/ordersStore'
import { OrderMessage } from '../OrderMessage/OrderMessage'
import { useNavigate } from 'react-router-dom'
import trashСan from '/src/assets/modalIcon/trashCan.png'
import styles from './CartModal.module.scss'

export const CartModal = () => {
  const { isCartOpen, closeCart, sneakers, removeFromCart, incrementQuantity, decrementQuantity, clearCart } =
    useCartStore(
      useShallow((state) => ({
        clearCart: state.clearCart,
        isCartOpen: state.isCartOpen,
        closeCart: state.closeCart,
        sneakers: state.sneakers,
        removeFromCart: state.removeFromCart,
        incrementQuantity: state.incrementQuantity,
        decrementQuantity: state.decrementQuantity,
      }))
    )

  const totalSneakers = sneakers.reduce((sum, s) => sum + s.quantity, 0)
  const displayCount = totalSneakers > 99 ? '99+' : totalSneakers

  const totalPrice = sneakers.reduce((sum, sneaker) => sum + sneaker.price * sneaker.quantity, 0)
  const tax = totalPrice * 0.05
  const total = totalPrice + tax

  const addOrder = useOrdersStore((state) => state.addOrder)
  const navigate = useNavigate()

  const [orderId, setOrderId] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleCloseModal = useCallback(() => {
    closeCart()
    setIsConfirmed(false)
    setOrderId('')
  }, [closeCart])

  const onNavigateToOrders = () => {
    closeCart()
    setIsConfirmed(false)
    setOrderId('')
    navigate('/profile')
  }

  const handleCheckout = () => {
    const order = { id: crypto.randomUUID(), sneakers, total, date: Date.now() }
    addOrder(order)
    setOrderId(order.id)
    setIsConfirmed(true)
    clearCart()
  }

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isCartOpen])

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal()
    }
    document.addEventListener('keydown', escapeHandler)
    return () => document.removeEventListener('keydown', escapeHandler)
  }, [handleCloseModal])

  if (!isCartOpen) return null

  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isConfirmed ? (
          <OrderMessage orderId={orderId} onClose={handleCloseModal} onNavigateToOrders={onNavigateToOrders} />
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.title}>
                {totalSneakers === 0 ? 'Корзина пуста' : `Товаров в корзине: ${displayCount}`}
              </h2>
              <button className={styles.trashCanButton} onClick={clearCart}>
                <img className={styles.trashIcon} src={trashСan} alt='Очистить корзину' />
              </button>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            {sneakers.length === 0 ? (
              <p className={styles.empty}>Корзина пуста</p>
            ) : (
              <>
                <div className={styles.itemsList}>
                  {sneakers.map((sneaker) => (
                    <div key={sneaker.id} className={styles.cartItem}>
                      <img className={styles.itemImage} src={sneaker.imageUrl} alt={sneaker.title} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{sneaker.title}</span>
                        <span className={styles.itemPrice}>{sneaker.price} руб.</span>
                      </div>

                      <QuantityControl
                        sneaker={sneaker}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                      />

                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(sneaker.id)}
                        aria-label='Удалить товар'>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.footer}>
                  <span className={styles.total}>Налог 5%: {tax} руб.</span>
                  <span className={styles.total}>Итого: {total} руб.</span>
                  <button onClick={handleCheckout} className={styles.checkoutBtn}>
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
