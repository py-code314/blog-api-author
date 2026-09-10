/* -------------------- Hooks -------------------- */
import { useState, useEffect } from 'react'

/* Hook to fetch data from a given URL */
export const useData = (url, options = {}) => {
  const { isEdit = false, isNew = false, isDelete = false } = options

  // State variables
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Abort controller
    const controller = new AbortController()

    // Fetch data
    const fetchData = async () => {
      setIsLoading(true)
      setError(false)

      const authToken = localStorage.getItem('jwtToken')

      try {
        const response = await fetch(
          url,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + authToken,
            },
          },
          controller.signal,
        )

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`)
        }

        let data = await response.json()

        setData(data)
        setError(false)
      } catch (err) {
        // Stop fetching if aborted
        if (err.name === 'AbortError') {
          console.log('Aborted')
          return
        }

        setError(err.message)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url, isEdit, isNew, isDelete])

  return { data, isLoading, error }
}
