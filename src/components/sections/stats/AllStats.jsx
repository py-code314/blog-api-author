/* -------------------- Styles -------------------- */
import styles from './AllStats.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-2.svg'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData'

/* Component to show stats */
const AllStats = () => {
  // Get all stats
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/stats/all',
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.stats}>
        <h2 className={styles.subTitle}>Stats</h2>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving stats. Please try again later.</p>
          </div>
        </div>
      </div>
    )

  const {
    postsTotal,
    publishedTotal,
    draftsTotal,
    categoriesTotal,
    tagsTotal,
  } = data

  return (
    <>
      <div className={styles.stats}>
        <h2 className={styles.subTitle}>Stats</h2>

        {/* Stats  */}
        <ul className={styles.list}>
          <li>
            <strong>Total Posts: </strong>
            {postsTotal}
          </li>
          <li>
            <strong>Total Published Posts: </strong>
            {publishedTotal}
          </li>
          <li>
            <strong>Total Drafts: </strong>
            {draftsTotal}
          </li>
          <li>
            <strong>Total Categories: </strong>
            {categoriesTotal}
          </li>
          <li>
            <strong>Total Tags: </strong>
            {tagsTotal}
          </li>
        </ul>
      </div>
    </>
  )
}

export default AllStats
