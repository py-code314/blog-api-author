import styles from './Navbar.module.css'
import { NavLink } from 'react-router'

/* Display Navbar */
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Navigation links */}
      <ul className={styles.navList}>
        <li className={styles.navItem}>Our Story</li>
        <li className={styles.navItem}>Membership</li>

        {/* Sign-up link */}
        <li className={styles.navItem}>
          <NavLink
            to={`/sign-up`}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }>
            Sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
