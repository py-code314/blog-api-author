// import styles from './HomePageLayout.module.css'
import Header from '../header/Header'

/* Display Header  */
const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default PageLayout
