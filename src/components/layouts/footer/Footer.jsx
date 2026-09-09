/* -------------------- Styles -------------------- */
import styles from '../footer/Footer.module.css'

/* Component to show footer */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Footer list */}
      <ul className={styles.footerList}>
        <li className={styles.footerItem}>Help</li>
        <li className={styles.footerItem}>Status</li>
        <li className={styles.footerItem}>About</li>
        <li className={styles.footerItem}>Careers</li>
        <li className={styles.footerItem}>Privacy</li>
        <li className={styles.footerItem}>Terms</li>
      </ul>
    </footer>
  )
}

export default Footer
