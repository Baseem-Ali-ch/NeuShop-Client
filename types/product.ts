export interface Product {
  id: number
  name: string
  description: string
  price: number
  salePrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  date: string
  isNew?: boolean
  colors?: string[]
  sizes?: string[]
}
