import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoritesStore {
  favorites: string[]
  toggleFavorite: (id: string) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (id) => {
        set((state) => {
          const isFavorite = state.favorites.includes(id)
          return {
            favorites: isFavorite ? state.favorites.filter((favId) => favId !== id) : [...state.favorites, id],
          }
        })
      },
    }),
    {
      name: 'favoritesStorage',
    }
  )
)
