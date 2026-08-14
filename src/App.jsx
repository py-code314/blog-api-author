import { useState } from 'react'
import LandingPage from './pages/landing-page/LandingPage'
import Homepage from './pages/homepage/Homepage'
import { AuthContext } from './contexts/auth/AuthContext'
import { useToken } from './hooks/useToken'
import './App.css'

function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [user, setUser] = useState({})
  const { token, setToken, saveToken } = useToken()

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
