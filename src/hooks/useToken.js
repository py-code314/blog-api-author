import { useState } from 'react'

export const useToken = () => {
  const getToken = () => {
    const userToken = localStorage.getItem('jwtToken')
    if (!userToken) {
      return null
    } else {
      return userToken
    }
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    localStorage.setItem('jwtToken', userToken)
  }

  return {
    token,
    setToken,
    saveToken,
  }
}
