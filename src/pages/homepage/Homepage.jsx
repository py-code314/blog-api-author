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
        <Header />
        <Sidebar/>
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Homepage
