import { useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'
import styles from './CartModal.module.scss'

export const CartModal = () => {
  const { isCartOpen, closeCart } = useCartStore()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    }
    {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isCartOpen])

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', escapeHandler)
  }, [closeCart])

  if (!isCartOpen) return null

  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeCart}>
          ✕
        </button>
        <h2>Корзина</h2>
        <div className={styles.content}>
          <p>Корзина пока пуста</p>
          {/*СПИСОК КРОССОВОК ЧТО КИНУЛИ В КОРЗИНУ*/}
        </div>
      </div>
    </div>
  )
}
