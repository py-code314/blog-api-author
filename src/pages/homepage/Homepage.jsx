/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from '../../components/layouts/header/Header'
import Footer from '../../components/layouts/footer/Footer'
import Sidebar from '../../components/layouts/sidebar/Sidebar'

/* Component to display homepage */
const Homepage = () => {
  return (
    <>
      <div className={styles.homepage}>
        <div className={styles.homepageWrapper}>
          <Header className={styles.header} />
          <Sidebar className={styles.sidebar} />
          <main className={styles.main}>
            <Outlet />
          </main>
          <Footer className={styles.footer} />
        </div>
      </div>
    </>
  )
}

export default Homepage
