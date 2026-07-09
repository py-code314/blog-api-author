import styles from './LandingPage.module.css'
import Hero from '../hero/Hero'

const LandingPage = () => {
  return (
    <>
      {/* <Footer /> */}
      <main className={styles.landingPage}>
        <Hero />
        <p>Footer section</p>
      </main>
    </>
  )
}

export default LandingPage
