import { useState } from 'react'

export const useSubmitForm = (url) => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)

  const fetchData = async (formData) => {
    setStatus('fetching')
    setData(null)

    const authToken = localStorage.getItem('jwtToken')

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      })

      // if (!response.ok) {
      //   throw new Error(`HTTP error: Status ${response.status}`)
      // }

      const responseData = await response.json()

      setData(responseData)
      setStatus('fetched')
      return responseData
    } catch (error) {
      setData(error)
      setStatus('failed')
      return null
    }
  }

  return [fetchData, status, data]
}
