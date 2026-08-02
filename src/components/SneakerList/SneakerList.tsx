import React, { useMemo, useCallback } from 'react'
import { useSneakers } from '../../hooks/useSneakers'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { SearchInput } from '../SearchInput/SearchInput'
import { SneakerCard } from '../SneakerCard/SneakerCard'
import { useSearchParams } from 'react-router-dom'

import styles from './SneakerList.module.scss'

export const SneakerList = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const sortOptions = (searchParams.get('sort') as 'price-low' | 'price-high' | 'name-asc' | 'name-desc') || 'price-low'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const { data, isLoading, isError, error } = useSneakers()
  const cartItems = useCartStore((state) => state.sneakers)
  const addToCart = useCartStore((state) => state.addToCart)
  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const handleSearchUpdate = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const params = new URLSearchParams(searchParams)
      if (value === '') {
        params.delete('minPrice')
      } else {
        const num = Number(value)
        if (num < 0) {
          params.set('minPrice', '0')
        } else {
          params.set('minPrice', value)
        }
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const params = new URLSearchParams(searchParams)
      if (value === '') {
        params.delete('maxPrice')
      } else {
        const num = Number(value)
        if (num < 0) {
          params.set('maxPrice', '0')
        } else {
          params.set('maxPrice', value)
        }
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value
      const params = new URLSearchParams(searchParams)
      if (value === 'default') {
        params.delete('sort')
      } else {
        params.set('sort', value)
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  const filteredData = useMemo(() => {
    return data?.filter((sneaker) => sneaker.title.toLowerCase().includes(search.toLowerCase()))
  }, [data, search])

  const priceFilteredData = useMemo(() => {
    return filteredData?.filter((sneaker) => {
      const price = sneaker.price
      if (minPrice !== '' && price < Number(minPrice)) return false
      if (maxPrice !== '' && price > Number(maxPrice)) return false
      return true
    })
  }, [filteredData, minPrice, maxPrice])

  const sortedData = useMemo(() => {
    return [...(priceFilteredData || [])].sort((a, b) => {
      switch (sortOptions) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })
  }, [priceFilteredData, sortOptions])

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>
  if (isError) return <div className={styles.error}>Ошибка: {error.message}</div>

  return (
    <div className={styles.sneakerList}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Все кроссовки</h1>
        <div className={styles.rightGroup}>
          <select className={styles.sortSelect} onChange={handleSortChange} value={sortOptions}>
            <option value='name-asc'> от A до Z</option>
            <option value='name-desc'>от Z до A</option>
            <option value='price-high'> Сначала дорогие</option>
            <option value='price-low'> Сначала дешёвые</option>
            <option value='default'>По умолчанию</option>
          </select>

          <input
            type='number'
            className={styles.priceInput}
            placeholder='Цена от'
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type='number'
            className={styles.priceInput}
            placeholder='Цена до'
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <SearchInput
            initialValue={search}
            onSearch={handleSearchUpdate}
            placeholder='  Поиск...'
            className={styles.searchInput}
          />
        </div>
      </div>

      <div>
        {sortedData.length === 0 ? (
          <h2 className={styles.empty}>Упс, таких кроссовок нет...</h2>
        ) : (
          <ul className={styles.grid}>
            {sortedData.map((sneaker) => (
              <SneakerCard
                key={sneaker.id}
                sneaker={sneaker}
                isFavorite={favorites.includes(sneaker.id)}
                isInCart={cartItems.some((item) => item.id === sneaker.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
