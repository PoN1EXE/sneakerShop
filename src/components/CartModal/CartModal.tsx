import { useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'
import { useShallow } from 'zustand/shallow'
import styles from './CartModal.module.scss'
import { QuantityControl } from '../QuantityControl/QuantityControl'

export const CartModal = () => {
  const { isCartOpen, closeCart, items, removeFromCart, incrementQuantity, decrementQuantity } = useCartStore(
    useShallow((state) => ({
      isCartOpen: state.isCartOpen,
      closeCart: state.closeCart,
      items: state.items,
      removeFromCart: state.removeFromCart,
      incrementQuantity: state.incrementQuantity,
      decrementQuantity: state.decrementQuantity,
    }))
  )

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

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const nalog = totalPrice * 0.05
  const priceWithNalog = totalPrice + nalog

  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeCart}>
          ✕
        </button>

        <h2 className={styles.title}>Корзина</h2>

        {items.length === 0 ? (
          <p className={styles.empty}>Корзина пуста</p>
        ) : (
          <>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img className={styles.itemImage} src={item.imageUrl} alt={item.title} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemPrice}>{item.price} руб.</span>
                  </div>

                  <QuantityControl
                    item={item}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                  />

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label='Удалить товар'>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <span className={styles.total}>Налог 5%: {nalog} </span>
              <span className={styles.total}>Итого: {priceWithNalog} руб.</span>
              <button className={styles.checkoutBtn}>Оформить заказ</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
