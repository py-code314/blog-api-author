import styles from './PageLayout.module.css'
import Header from '../header/Header'

/* Display Header  */
const PageLayout = ({ children }) => {
  return (
    <>
      <div className={styles.landingPage}>
        <Header />
        {children}
      </div>
    </>
  )
}

export default PageLayout
