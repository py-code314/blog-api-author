/* -------------------- Hooks -------------------- */
import { useState } from 'react'

/* Hook for submitting a form */
export const useSubmitForm = (url) => {
  // State variables
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)

  // Fetch data
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

      const responseData = await response.json()

      setData(responseData)
      setStatus('fetched')
      return responseData
    } catch (error) {
      console.error
      setData(error)
      setStatus('failed')
      return null
    }
  }
  
  // Return the function that actually submits form data
  return [fetchData, status, data]
}
