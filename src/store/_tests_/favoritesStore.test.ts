import { describe, it, expect } from 'vitest'
import { useFavoritesStore } from '../favoritesStore'

describe('useFavoritesStore', () => {
  it('переключение избранного (добавление и удаление)', () => {
    useFavoritesStore.getState().toggleFavorite('1')
    expect(useFavoritesStore.getState().favorites).toContain('1')

    useFavoritesStore.getState().toggleFavorite('1')
    expect(useFavoritesStore.getState().favorites).not.toContain('1')
  })
})
