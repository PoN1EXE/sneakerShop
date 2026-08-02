import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchInputProps {
  initialValue: string
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchInput = ({ initialValue, onSearch, placeholder = 'Поиск...', className = '' }: SearchInputProps) => {
  const [value, setValue] = useState(initialValue)
  const debouncedValue = useDebounce(value, 200)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <input
      type='text'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={className}
      placeholder={placeholder}
    />
  )
}
