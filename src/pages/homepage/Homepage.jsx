/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import Header from '../../components/layouts/header/Header'
import Footer from '../../components/layouts/footer/Footer'
import { Outlet } from 'react-router'
import Sidebar from '../../components/layouts/sidebar/Sidebar'

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
