/* -------------------- Styles -------------------- */
import styles from './Drafts.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-2.svg'
import moreIcon from '../../../assets/icons/icon-double-arrow-right.svg'
/* -------------------- Hooks -------------------- */
import {useData} from '../../../hooks/useData.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

const Drafts = () => {
  // Get all unpublished posts
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/posts/me/drafts',
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
      <div className={styles.drafts}>
        <title>Scriblr | Drafts</title>
        <h2 className={styles.subTitle}>Drafts</h2>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving posts. Please try again later.</p>
          </div>
        </div>
        {/* Link to home  */}
        <Link className={styles.homeLink} to={'/'}>
          Home
        </Link>
      </div>
    )
  return (
    <>
      <div className={styles.drafts}>
        <title>Scriblr | Drafts</title>
        {/* Link to home  */}
        <Link className={styles.homeLink} to={'/'}>
          Home
        </Link>
        <h2 className={styles.subTitle}>Drafts</h2>

        <ul className={styles.list}>
          {data.posts.length === 0 ? (
            <p>You don't have any drafts yet.</p>
          ) : (
            data.posts.map((post) => (
              <li className={styles.post} key={post.id}>
                <h3>{post.title}</h3>
                <div className={styles.content}>{parse(post.content)}</div>
                {/* Link to post details  */}
                <Link className={styles.detailsLink} to={`/posts/${post.id}`}>
                  Read more{' '}
                  <img src={moreIcon} alt="" width={20} height={20} />
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}

export default Drafts
