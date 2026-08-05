import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserStore {
  isProfileEditOpen: boolean
  openProfileEdit: () => void
  closeProfileEdit: () => void
  user: User
  updateUser: (user: User) => void
}

export interface User {
  name: string
  phone: string
  email: string
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isProfileEditOpen: false,
      user: { name: 'Фамилия Имя', phone: '+7 (999) 999-99-99', email: 'user@example.com' },

      openProfileEdit: () => set({ isProfileEditOpen: true }),
      closeProfileEdit: () => set({ isProfileEditOpen: false }),

      updateUser: (newUser) => set({ user: newUser }),
    }),
    { name: 'userStorage' }
  )
)
