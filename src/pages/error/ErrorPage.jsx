import styles from './ErrorPage.module.css'
import { Link } from 'react-router'

/* Display error page */
const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <header className={styles.header}>
        <title>Scriblr | Error</title>
        {/* Title */}
        <Link to={`/`}>
          <h1 className={styles.title}>Scriblr</h1>
        </Link>
      </header>

      {/* Error msg  */}
      <main className={styles.main}>
        <p className={styles.errorMsg}>Uh oh, the page you're looking for can't be found.</p>
      </main>
    </div>
  )
}

export default ErrorPage
