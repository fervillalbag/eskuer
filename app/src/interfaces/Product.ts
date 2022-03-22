import { Price } from './Price'

export interface ProductType {
  id: string
  name: string
  category: string
  image: string
  price: [Price]
}
