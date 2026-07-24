export interface Sneaker {
  id: number | string
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
}
export const sneakers: Sneaker[] = [
  {
    id: 'sneaker-1',
    title: 'Nike Air Max 90',
    price: 19500,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-2',
    title: 'Adidas Ultraboost',
    price: 29000,
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69d1b5d1?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-3',
    title: 'New Balance 574',
    price: 27000,
    imageUrl: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-4',
    title: 'Puma Suede Classic',
    price: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-5',
    title: 'Reebok Club C 85',
    price: 11500,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-6',
    title: 'Asics Gel-Lyte III',
    price: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1605348532760-1633f2cfa0e8?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-7',
    title: 'Vans Old Skool',
    price: 4000,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-8',
    title: 'Converse Chuck Taylor All Star',
    price: 17000,
    imageUrl: 'https://images.unsplash.com/photo-1525879000488-bff3b1c387cf?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-9',
    title: 'Nike Air Force 1',
    price: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-10',
    title: 'Adidas Stan Smith',
    price: 11000,
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961b28c?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-11',
    title: 'Puma RS-X',
    price: 7900,
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-12',
    title: 'New Balance 990v5',
    price: 22500,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-13',
    title: 'Asics Gel-Kayano 27',
    price: 9800,
    imageUrl: 'https://images.unsplash.com/photo-1605348532760-1633f2cfa0e8?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-14',
    title: 'Reebok Classic Leather',
    price: 10000,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-15',
    title: 'Vans Sk8-Hi',
    price: 14000,
    imageUrl: 'https://images.unsplash.com/photo-1535040287402-15b0cf58d4cb?w=300',
    isFavorite: false,
    isAdded: false,
  },
  {
    id: 'sneaker-16',
    title: 'Converse Run Star Hike',
    price: 23000,
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300',
    isFavorite: false,
    isAdded: false,
  },
]

export const fetchSneakers = (): Promise<Sneaker[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sneakers)
    }, 500)
  })
}
