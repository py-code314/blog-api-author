/* -------------------- Hooks -------------------- */
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../contexts/auth/AuthContext'

/* Hook to fetch data from a given URL */
export const useData = (url, options = {}) => {
  const {
    isEdit = false,
    isNew = false,
    isDelete = false,
    isBio = false,
  } = options

  const { handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  // State variables
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Abort controller
    const controller = new AbortController()
    const signal = controller.signal

    // Fetch data
    const fetchData = async () => {
      setIsLoading(true)
      setError(false)

      const authToken = localStorage.getItem('jwtToken')

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + authToken,
          },
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
        if (!response.ok) {
          throw result
        }

        // Set result as data if fetch is successful
        if (!signal.aborted) {
          setData(result)
          setError(false)
        }
      } catch (err) {
        console.error(err)
        // Stop fetching if aborted
        if (err.name === 'AbortError') {
          console.log('Fetch request cancelled successfully')
          return
        }

        // Fetch isn't successful
        if (!signal.aborted) {
          setError(err)
          setData(null)
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url, isEdit, isNew, isDelete, isBio, navigate, handleLogout])

  return { data, isLoading, error }
}
