import styles from './Homepage.module.css'
import Header from '../../components/layouts/header/Header'
// import Hero from '../../components/pages/landing-page/hero/Hero'
import Dashboard from '../dashboard/Dashboard';
import Footer from '../../components/layouts/footer/Footer'


const Homepage = () => {
  return (
    <>
      <div className={styles.homepage}>
        <Header />
        <main className={styles.main}>
          {/* <Hero /> */}
          <Dashboard/>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Homepage
