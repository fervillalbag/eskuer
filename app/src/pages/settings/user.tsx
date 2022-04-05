import React from 'react'

import NotFound from '../../components/NotFound'
import useAuth from '../../hooks/useAuth'

const SettingsUser: React.FC = () => {
  const { user, logout } = useAuth()

  if (!user) return <NotFound />

  return (
    <div>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}

export default SettingsUser
