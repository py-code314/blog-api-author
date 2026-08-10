import styles from './Navbar.module.css'
import { NavLink } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import Button from '../../core/Button/Button'
import SignupModal from '../../../pages/signup-modal/SignupModal'
import LoginModal from '../../../pages/login-modal/LoginModal'

/* Display Navbar */
export const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, activeModal, setActiveModal } =
    useContext(AuthContext)

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
          {isLoggedIn ? (
            <>
              <li className={styles.navItem}>
                <NavLink
                  className={styles.navLink}
                  to={`/new-post`}>
                  + Post
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <Button
                  id="logout"
                  className="logoutBtn"
                  title="Log out"
                  onClick={handleLogout}>
                  Log out{' '}
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>Our Story</li>
              <li className={styles.navItem}>Membership</li>
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

      {activeModal === 'signup' && <SignupModal />}
      {activeModal === 'login' && <LoginModal />}
    </>
  )
}

export default NavBar
