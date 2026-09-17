export function checkTokenExpiry(token) {
  if (!token) return false

  try {
    // Decode JWT
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )
    const decoded = JSON.parse(jsonPayload)

    // Get current time and compare it to time in JWT
    const currentTime = Math.floor(Date.now() / 1000)

    if (decoded.exp < currentTime) {
      console.warn('Token has expired!')
      localStorage.removeItem('jwtToken')
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
