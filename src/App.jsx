/* -------------------- Styles -------------------- */
import './App.css'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
import { useToken } from './hooks/useToken'
/* -------------------- Context -------------------- */
import { AuthContext } from './contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import LandingPage from './pages/landing-page/LandingPage'
import Homepage from './pages/homepage/Homepage'
/* -------------------- Functions -------------------- */
import { checkTokenExpiry } from './utils/login'

/* Main App component */
function App() {
  // State variables
  const [activeModal, setActiveModal] = useState(null)
  const [user, setUser] = useState({})
  const { token, setToken, saveToken } = useToken()

  // Check for JWT token expiry
  const isTokenValid = token ? checkTokenExpiry(token) : false

  // Handler to set type of modal to show
  const handleCloseModal = () => {
    setActiveModal(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    setToken(null)
  }

  return (
    <div className="page">
      <AuthContext
        value={{
          token,
          setToken,
          saveToken,
          handleCloseModal,
          activeModal,
          setActiveModal,
          user,
          setUser,
          handleLogout,
          isTokenValid,
        }}>
        {token && isTokenValid ? <Homepage /> : <LandingPage />}
      </AuthContext>
    </div>
  )
}

export default App
