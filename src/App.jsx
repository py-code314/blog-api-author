import { useState } from 'react'
import PageLayout from './components/layouts/page-layout/PageLayout'
import LandingPage from './pages/landing-page/LandingPage'
import './App.css'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <div className="page">
      <PageLayout isSignedIn={isSignedIn} >
        {isSignedIn ? <p>Show Dashboard</p> : <LandingPage />}
      </PageLayout>
    </div>
  )
}

export default App
