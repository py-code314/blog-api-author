// import NavBar from "./components/layouts/navbar/Navbar"
// import Header from './components/layouts/header/Header'
// import Footer from './components/layouts/footer/Footer'
import HomePageLayout from './components/layouts/homepage/HomePageLayout'
import { useState } from 'react'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    <div className="home-page">
      <HomePageLayout>
        {isSignedIn ? (
          <p>Show Dashboard</p>
        ) : (
          <p>Show Landing Page with Hero section</p>
        )}
      </HomePageLayout>
    </div>
  )
}

export default App
