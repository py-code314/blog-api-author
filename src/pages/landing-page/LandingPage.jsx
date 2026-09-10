/* -------------------- Styles -------------------- */
import styles from './LandingPage.module.css'
/* -------------------- Components -------------------- */
import Header from '../../components/layouts/header/Header'
import Hero from '../../components/sections/hero/Hero'
import Footer from '../../components/layouts/footer/Footer'

/* Component to display landing page */
const LandingPage = () => {
  return (
    <>
      <div className={styles.landingPage}>
        <Header />
        <main className={styles.main}>
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
