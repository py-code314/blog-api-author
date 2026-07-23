import styles from './Navbar.module.css'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { ModalContext } from '../../../contexts/modal/ModalContext'
import Button from '../../core/Button/Button'
import SignupModal from '../../../pages/signup-modal/SignupModal'

/* Display Navbar */
export const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  // Update 'isOpen' when modal is closed
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Navigation links */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>Our Story</li>
          <li className={styles.navItem}>Membership</li>

          {/* Log-in link */}
          <li className={styles.navItem}>
            <NavLink to={`/log-in`}>Log in</NavLink>
          </li>

          {/* Sign-up link */}
          <li className={styles.navItem}>
            <Button
              id="signup"
              className="signupBtn"
              title="Sign up"
              onClick={() => setModalOpen(true)}>
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
        <SignupModal />
      </ModalContext>
    </>
  )
}

export default NavBar
