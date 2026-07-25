import styles from './Navbar.module.css'
// import { NavLink } from 'react-router'
import { useState } from 'react'
import { ModalContext } from '../../../contexts/modal/ModalContext'
import { NavbarContext } from '../../../contexts/navbar/NavbarContext'
import Button from '../../core/Button/Button'
import SignupModal from '../../../pages/signup-modal/SignupModal'
import LoginModal from '../../../pages/login-modal/LoginModal'

/* Display Navbar */
export const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)

  // Update 'isOpen' when modal is closed
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleSignup = () => {
    setModalOpen(true)
    setActiveModal('signup')
  }

  const handleLogin = () => {
    setModalOpen(true)
    setActiveModal('login')
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Navigation links */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>Our Story</li>
          <li className={styles.navItem}>Membership</li>
          {/* Log-in Button */}
          <li className={styles.navItem}>
            <Button
              id="login"
              className="loginBtn"
              title="Log in"
              onClick={handleLogin}>
              Log in{' '}
            </Button>
          </li>
          {/* Sign-up button */}
          <li className={styles.navItem}>
            <Button
              id="signup"
              className="signupBtn"
              title="Sign up"
              onClick={handleSignup}>
              Sign Up{' '}
            </Button>
          </li>
        </ul>
      </nav>

      <ModalContext
        value={{
          isModalOpen,
          handleCloseModal,
        }}>
        <NavbarContext value={{ setActiveModal }}>
          {activeModal === 'signup' && <SignupModal />}
          {activeModal === 'login' && <LoginModal />}
        </NavbarContext>
      </ModalContext>
    </>
  )
}


export default NavBar
