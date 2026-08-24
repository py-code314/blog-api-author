/* -------------------- Styles -------------------- */
import styles from './Header.module.css'
/* -------------------- Components -------------------- */
import NavBar from '../navbar/Navbar'
import { Link } from 'react-router'

/* Display Header */
const Header = () => {
  return (
    <header className={styles.header}>
      <title>Scriblr</title>
      {/* Title */}
      <Link to={`/`}>
      <h1 className={styles.title}>Scriblr</h1>
      </Link>

      <NavBar />
    </header>
  )
}

export default Header
