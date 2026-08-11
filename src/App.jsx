import { useState } from 'react'
import LandingPage from './pages/landing-page/LandingPage'
import Homepage from './pages/homepage/Homepage'
import { AuthContext } from './contexts/auth/AuthContext'
import './App.css'

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="page">
      <AuthContext
        value={{
          isLoggedIn,
          setIsLoggedIn,
          handleCloseModal,
          activeModal,
          setActiveModal,
          user,
          setUser,
        }}>
        {isLoggedIn ? <Homepage /> : <LandingPage />}
      </AuthContext>
    </div>
  )
}

export default App
