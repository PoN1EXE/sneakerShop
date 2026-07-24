import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchSneakers } from '../mocks/sneakers'
import type { Sneaker } from './../mocks/sneakers'

export const useSneakers = (): UseQueryResult<Sneaker[], Error> => {
  return useQuery<Sneaker[], Error>({ queryKey: ['sneakers'], queryFn: fetchSneakers })
}
