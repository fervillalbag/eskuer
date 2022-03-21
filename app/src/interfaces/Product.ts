import { Price } from './Price'

export interface ProductType {
  id: string
  name: string
  category: string
  image: string
  supermarket: [Supermarket]
}

interface Supermarket {
  id: string
  price: [Price]
}
