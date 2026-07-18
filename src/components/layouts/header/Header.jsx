import styles from './Header.module.css'
import NavBar from '../navbar/Navbar'

/* Display Header */
const Header = () => {
  return (
    <header className={styles.header}>
      <title>Scriblr</title>
      {/* Title */}
      <h1 className={styles.title}>Scriblr</h1>

      <NavBar />
    </header>
  )
}

export default Header
