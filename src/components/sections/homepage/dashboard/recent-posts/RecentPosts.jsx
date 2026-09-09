/* -------------------- Styles -------------------- */
import styles from './RecentPosts.module.css'
/* -------------------- Images -------------------- */
import errorIcon from '../../../../../assets/icons/icon-error-2.svg'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../../../hooks/useData.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show previews of recent posts */
const RecentPosts = () => {
  // Get posts data
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/posts/recent',
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
      <div className={styles.recentPosts}>
        <h2 className={styles.subTitle}>Recent Posts</h2>
        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving posts. Please try again later.</p>
          </div>
        </div>
      </div>
    )

  const { posts } = data

  return (
    <>
      <div className={styles.recentPosts}>
        <h2 className={styles.subTitle}>Recent Posts</h2>
        <ul className={styles.list}>
          {posts?.length > 0 &&
            posts.map((post) => (
              <li className={styles.post} key={post.id}>
                <h3>{post.title}</h3>
                <div className={styles.content}>{parse(post.content)}</div>
                {/* Link to view post details  */}
                <Link className={styles.detailsLink} to={`/posts/${post.id}`}>
                  View details <span>→</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default RecentPosts
