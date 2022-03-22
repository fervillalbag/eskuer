import { gql } from '@apollo/client'

export const CREATE_PRICE = gql`
  mutation createPrice($input: PriceInput!) {
    createPrice(input: $input) {
      message
      success
    }
  }
`
