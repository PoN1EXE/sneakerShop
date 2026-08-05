import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NotFoundComponent.module.scss'

export const NotFoundComponent = () => {
  const navigate = useNavigate()

  const handleQuit = () => {
    navigate('/')
  }

  useEffect(() => {
    document.title = 'Страница не найдена — Sneakers'
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Упс... Такой страницы нет</h1>
        <p className={styles.subtitle}>Проверьте правильность адреса или вернитесь на главную.</p>
        <button aria-label='Вернуться к списку кроссовок' className={styles.button} onClick={handleQuit}>
          Вернуться к списку кроссовок
        </button>
      </div>
    </div>
  )
}
