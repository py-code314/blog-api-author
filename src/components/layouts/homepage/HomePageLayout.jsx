// import styles from './HomePageLayout.module.css'
import Header from '../header/Header'

/* Display Header  */
const HomePageLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default HomePageLayout
