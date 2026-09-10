import styles from './LandingPage.module.css'
import Header from '../../components/layouts/header/Header'
import Hero from '../../components/sections/hero/Hero'
import Footer from '../../components/layouts/footer/Footer'

const LandingPage = () => {
  return (
    <>
      <div className={styles.landingPage}>
        <Header/>
        <main className={styles.main}>
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
