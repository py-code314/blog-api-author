import styles from './Header.module.css'
import NavBar from '../navbar/Navbar'


/* Display Header */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Title */}
        <h1 className={styles.title}>Scriblr</h1>

        <NavBar />
      </div>
    </header>
  )
}

export default Header
