import { useState } from 'react'
import LandingPage from './pages/landing-page/LandingPage'
import Homepage from './pages/homepage/Homepage'
import { AuthContext } from './contexts/auth/AuthContext'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="page">
      <AuthContext value={{ isLoggedIn, setIsLoggedIn }}>
        {isLoggedIn ? <Homepage /> : <LandingPage />}
      </AuthContext>
    </div>
  )
}

export default App
