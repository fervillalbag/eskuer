import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_SUPERMARKET } from '../graphql/queries/supermarket'

interface SelectSuperIprops {
  item: any
}

const SelectSuper: React.FC<SelectSuperIprops> = ({ item }) => {
  const { data: dataSuper } = useQuery(GET_SUPERMARKET, {
    variables: {
      id: item?.idSuper
    }
  })

  const supermarket = dataSuper?.getSupermarket || {}

  return (
    <option key={supermarket?.id} value={supermarket?.id}>
      {supermarket?.name}
    </option>
  )
}

export default SelectSuper
