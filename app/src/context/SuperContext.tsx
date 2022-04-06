import React, { createContext, useState } from 'react'

export const SuperContext = createContext(null)

const SuperProvider: React.FC = ({ children }) => {
  const [superSelected, setSuperSelected] = useState(null)

  return (
    <SuperContext.Provider value={{ superSelected, setSuperSelected }}>
      {children}
    </SuperContext.Provider>
  )
}

export default SuperProvider
