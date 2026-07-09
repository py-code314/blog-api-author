import styles from './LandingPage.module.css'
import Hero from '../../components/pages/landing-page/hero/Hero'
import Footer from '../../components/layouts/footer/Footer'

const LandingPage = () => {
  return (
    <>
      <main className={styles.main}>
        <Hero />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
