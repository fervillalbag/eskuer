import React, { createContext, useState } from 'react'
import { User } from '../interfaces/User'

export const UserContext = createContext(null)

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
