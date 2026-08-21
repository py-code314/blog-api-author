/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import Header from '../../components/layouts/header/Header'
import Footer from '../../components/layouts/footer/Footer'
import { Outlet } from 'react-router'

const Homepage = () => {
  return (
    <>
      <div className={styles.homepage}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Homepage
