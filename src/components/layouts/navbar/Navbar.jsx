import styles from './Navbar.module.css'
import { NavLink } from 'react-router'
import Button from '../../core/Button/Button'

/* Display Navbar */
const NavBar = () => {
  return (
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
          {/* <NavLink
            to={`/sign-up`}
            className={styles.signUp}
          >
            Sign up
          </NavLink> */}
          <Button id="signup" className="signup" title="Sign up">
            Sign Up{' '}
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
