import { useShallow } from 'zustand/shallow'
import { useUserStore } from '../../store/userStore'
import { useEffect, useRef, useState } from 'react'
import type { User } from '../../store/userStore'
import styles from './ProfileModal.module.scss'

export const ProfileModal = () => {
  const { isOpen, onClose, user, updateUser } = useUserStore(
    useShallow((state) => ({
      isOpen: state.isProfileEditOpen,
      onClose: state.closeProfileEdit,
      user: state.user,
      updateUser: state.updateUser,
    }))
  )
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputPhoneRef = useRef<HTMLInputElement>(null)
  const inputEmailRef = useRef<HTMLInputElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const [formData, setFormData] = useState(user)

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(user)
      previousFocusRef.current = document.activeElement as HTMLElement
      setTimeout(() => {
        inputNameRef.current?.focus()
      }, 50)
    } else {
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [isOpen, user])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const activeElement = document.activeElement

      if (activeElement === inputNameRef.current) {
        inputPhoneRef.current?.focus()
      } else if (activeElement === inputPhoneRef.current) {
        inputEmailRef.current?.focus()
      } else if (activeElement === inputEmailRef.current) {
        handleSaveData()
      }
    }
  }

  const handleChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSaveData = () => {
    if (formData.name.trim().split(/\s+/).length < 2) {
      alert('Имя должно содержать минимум имя и фамилию')
      return
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Введите корректный email')
      return
    }

    if (formData.phone.replace(/\D/g, '').length !== 11) {
      alert('Введите корректный номер телефона (11 цифр)')
      return
    }

    updateUser(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      {/* Я специально убрал закрытие модалки при нажатии на оверлей */}
      <div role='dialog' aria-modal='true' className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button aria-label='Закрыть редактирование' className={styles.closeButton} onClick={onClose}>
          х
        </button>
        <h2 className={styles.title}>Редактирование профиля</h2>

        <div className={styles.formGroup}>
          <label>Имя</label>
          <input
            onKeyDown={handleKeyDown}
            ref={inputNameRef}
            type='text'
            value={formData.name}
            onChange={handleChange('name')}
            placeholder='Введите имя'
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Номер телефона</label>
          <input
            onKeyDown={handleKeyDown}
            ref={inputPhoneRef}
            type='text'
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder='Введите номер телефона'
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            onKeyDown={handleKeyDown}
            ref={inputEmailRef}
            type='text'
            value={formData.email}
            onChange={handleChange('email')}
            placeholder='Введите Email'
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button aria-label='Отменить' className={styles.cancelButton} onClick={onClose}>
            Отменить
          </button>
          <button aria-label='Сохранить' className={styles.saveButton} onClick={handleSaveData}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
