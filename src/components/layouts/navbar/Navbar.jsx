import styles from './Navbar.module.css'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { ModalContext } from '../../../contexts/modal/modal'
import Button from '../../core/Button/Button'
import Modal from '../modal/Modal'

/* Display Navbar */
export const NavBar = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const onClose = () => {
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
              className="signup"
              title="Sign up"
              onClick={() => setModalOpen(true)}>
              Sign Up{' '}
            </Button>
          </li>
        </ul>
      </nav>

      <ModalContext value={{ isModalOpen, onClose }}>
        <Modal>
          <h1>Sign-up form</h1>
        </Modal>
      </ModalContext>
    </>
  )
}

export default NavBar
