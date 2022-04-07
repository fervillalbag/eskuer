import { gql } from '@apollo/client'

export const CREATE_PRICE = gql`
  mutation createPrice($input: PriceInput!) {
    createPrice(input: $input) {
      message
      success
    }
  }
`

export const UPDATE_PRICE = gql`
  mutation updatePrice($input: PriceInput!) {
    updatePrice(input: $input) {
      message
      success
    }
  }
`
