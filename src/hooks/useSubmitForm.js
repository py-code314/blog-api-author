/* -------------------- Hooks -------------------- */
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../contexts/auth/AuthContext'

/* Hook for submitting a form */
export const useSubmitForm = (url) => {
  const { handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  // State variables
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)

  // Abort controller
  const controller = new AbortController()
  const signal = controller.signal

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
        signal,
      })

      // Log out and redirect user to landing page
      if (response.status === 401) {
        handleLogout()
        navigate('/')
      }

      // Assign either data or error to 'result' variable
      let result = await response.json()

      // Throw error from server instead of custom error
      // if (!response.ok) {
      //   throw result
      // }

      // Set result as data if fetch is successful
      if (!signal.aborted) {
        setData(result)
        setStatus('fetched')
      }

      return result
    } catch (err) {
      console.error(err)

      // Stop fetching if aborted
      if (err.name === 'AbortError') {
        console.log('Fetch request cancelled successfully')
        return
      }

      // Fetch isn't successful
      if (!signal.aborted) {
        setData(err)
        setStatus('failed')
      }

      return null
    }
  }

  // Return the function that actually submits form data
  return [fetchData, status, data]
}
