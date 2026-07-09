// import NavBar from "./components/layouts/navbar/Navbar"
// import Header from './components/layouts/header/Header'
// import Footer from './components/layouts/footer/Footer'
import { useState } from 'react'
import PageLayout from './components/layouts/page-layout/PageLayout'
import LandingPage from './pages/landing-page/LandingPage'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <div className="home-page">
      <PageLayout>
        {isSignedIn ? <p>Show Dashboard</p> : <LandingPage />}
      </PageLayout>
    </div>
  )
}

export default App
