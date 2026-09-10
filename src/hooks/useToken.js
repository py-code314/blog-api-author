/* -------------------- Hooks -------------------- */
import { useState } from 'react'

/* Hook to manage JWT token */
export const useToken = () => {
  // Get token from local storage
  const getToken = () => {
    const userToken = localStorage.getItem('jwtToken')
    if (!userToken) {
      return null
    } else {
      return userToken
    }
  }

  const [token, setToken] = useState(getToken())

  // Store token in local storage
  const saveToken = (userToken) => {
    localStorage.setItem('jwtToken', userToken)
  }

  return {
    token,
    setToken,
    saveToken,
  }
}
