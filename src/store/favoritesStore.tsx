import { create } from 'zustand'

export interface FavoritesStore {
  favorites: string[]
  toggleFavorites: (id: string) => void
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],

  toggleFavorites: (id) => {
    set((state) => {
      const isFavorites = state.favorites.includes(id)
      return { favorites: isFavorites ? state.favorites.filter((favId) => favId !== id) : [...state.favorites, id] }
    })
  },
}))
