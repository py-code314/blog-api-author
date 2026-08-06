import styles from './Navbar.module.css'
// import { NavLink } from 'react-router'
import { useState } from 'react'
import { AuthUIContext } from '../../../contexts/auth-ui/AuthUIContext'
import Button from '../../core/Button/Button'
import SignupModal from '../../../pages/signup-modal/SignupModal'
import LoginModal from '../../../pages/login-modal/LoginModal'

/* Display Navbar */
export const NavBar = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Run this when user clicks Esc key or Close button
  const handleCloseModal = () => {
    setActiveModal(null)
  }

  const handleSignup = () => {
    setActiveModal('signup')
  }

  const handleLogin = () => {
    setActiveModal('login')
  }

  const handleLogout = () => {
    // console.log('log out')
    setIsLoggedIn(false)
    // Clear JWT
    localStorage.removeItem('jwtToken')
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Navigation links */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>Our Story</li>
          <li className={styles.navItem}>Membership</li>
          {isLoggedIn ? (
            <li className={styles.navItem}>
              <Button
                id="logout"
                className="logoutBtn"
                title="Log out"
                onClick={handleLogout}>
                Log out{' '}
              </Button>
            </li>
          ) : (
            <>
              <li className={styles.navItem}>
                <Button
                  id="login"
                  className="loginBtn"
                  title="Log in"
                  onClick={handleLogin}>
                  Log in{' '}
                </Button>
              </li>
              <li className={styles.navItem}>
                <Button
                  id="signup"
                  className="signupBtn"
                  title="Sign up"
                  onClick={handleSignup}>
                  Sign Up{' '}
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <AuthUIContext
        value={{
          handleCloseModal,
          activeModal,
          setActiveModal,
          setIsLoggedIn,
        }}>
        {activeModal === 'signup' && <SignupModal />}
        {activeModal === 'login' && <LoginModal />}
      </AuthUIContext>
    </>
  )
}

export default NavBar
