import { useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useShallow } from 'zustand/shallow'
import { QuantityControl } from '../QuantityControl/QuantityControl'
import { useOrdersStore } from '../../store/ordersStore'
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

  const totalPrice = sneakers.reduce((sum, sneaker) => sum + sneaker.price * sneaker.quantity, 0)
  const nalog = totalPrice * 0.05
  const priceWithNalog = totalPrice + nalog

  const addOrder = useOrdersStore((state) => state.addOrder)

  const handleCheckout = () => {
    const order = { id: Date.now(), sneakers, total: priceWithNalog, date: Date.now() }
    addOrder(order)
    clearCart()
    closeCart()
  }

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isCartOpen])

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', escapeHandler)
    return () => document.removeEventListener('keydown', escapeHandler)
  }, [closeCart])

  if (!isCartOpen) return null

  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeCart}>
          ✕
        </button>

        <h2 className={styles.title}>Корзина</h2>

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
              <span className={styles.total}>Налог 5%: {nalog} </span>
              <span className={styles.total}>Итого: {priceWithNalog} руб.</span>
              <button onClick={handleCheckout} className={styles.checkoutBtn}>
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
