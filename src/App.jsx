// import NavBar from "./components/layouts/navbar/Navbar"
// import Header from './components/layouts/header/Header'
// import Footer from './components/layouts/footer/Footer'
import { useState } from 'react'
import HomePageLayout from './components/layouts/homepage/HomePageLayout'
import LandingPage from './components/pages/landing-page/LandingPage'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <div className="home-page">
      <HomePageLayout>
        {isSignedIn ? <p>Show Dashboard</p> : <LandingPage />}
      </HomePageLayout>
    </div>
  )
}

export default App
