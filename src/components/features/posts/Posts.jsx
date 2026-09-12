/* -------------------- Styles -------------------- */
import styles from './Posts.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-2.svg'
import detailsIcon from '../../../assets/icons/icon-double-arrow-right.svg'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

const AllPosts = () => {
  // Get all posts both published and unpublished
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/posts/me',
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
      <div className={styles.posts}>
        <title>Scriblr | All Posts</title>
        <h2 className={styles.subTitle}>All Posts</h2>

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
      <div className={styles.posts}>
        <title>Scriblr | All Posts</title>
        <h2 className={styles.subTitle}>All Posts</h2>

        {/* Preview of posts  */}
        <ul className={styles.list}>
          {data.posts.length > 0 &&
            data.posts.map((post) => (
              <li className={styles.post} key={post.id}>
                <h3>{post.title}</h3>
                <div className={styles.content}>{parse(post.content)}</div>
                {/* Link to post details  */}
                <Link className={styles.detailsLink} to={`/posts/${post.id}`}>
                  View details
                  <img src={detailsIcon} alt="" width={20} height={20} />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default AllPosts
