/* -------------------- Styles -------------------- */
import styles from './Navbar.module.css'
/* -------------------- Context -------------------- */
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth/AuthContext'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../core/button/Button'
import SignupModal from '../../features/signup-modal/SignupModal'
import LoginModal from '../../features/login-modal/LoginModal'

/* Component for navigation links */
const NavBar = () => {
  const { token, setToken, activeModal, setActiveModal } =
    useContext(AuthContext)

  // Handler functions
  const handleSignup = () => {
    setActiveModal('signup')
  }

  const handleLogin = () => {
    setActiveModal('login')
  }

  const handleLogout = () => {
    // Update token status
    setToken(null)

    // Delete JWT from local storage
    localStorage.removeItem('jwtToken')
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Navigation links */}
        <ul className={styles.navList}>
          {/* Show nav items conditionally */}
          {token ? (
            <>
              <li className={styles.navItem}>
                <Link className={styles.link} to={`/new-post`}>
                  <span className={styles.addIcon}>+</span> Post
                </Link>
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
