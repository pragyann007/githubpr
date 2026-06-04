import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'

const PublicRoutes = ({children}) => {




  return (
    <div>
        {children}
    </div>
  )
}

export default PublicRoutes