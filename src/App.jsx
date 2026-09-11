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

/* Main App component */
function App() {
  // State variables
  const [activeModal, setActiveModal] = useState(null)
  const [user, setUser] = useState({})
  const { token, setToken, saveToken } = useToken()

  // Handler to set type of modal to show
  const handleCloseModal = () => {
    setActiveModal(null)
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
        }}>
        {token ? <Homepage /> : <LandingPage />}
      </AuthContext>
    </div>
  )
}

export default App
