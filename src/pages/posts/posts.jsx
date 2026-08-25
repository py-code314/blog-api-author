/* -------------------- Styles -------------------- */
import styles from './posts.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Icons -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

const AllPosts = () => {
  // Get all posts
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/posts/',
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
        <Link className={styles.homeLink} to={'/'}>
          Back to Home
        </Link>
      </div>
    )
  return (
    <>
      <div className={styles.posts}>
        <title>Scriblr | All Posts</title>
        <h2 className={styles.subTitle}>All Posts</h2>

        <ul className={styles.list}>
          {data.posts.length > 0 &&
            data.posts.map((post) => (
              <li className={styles.post} key={post.id}>
                <h3>{post.title}</h3>
                <div className={styles.content}>{parse(post.content)}</div>
                <Link className={styles.detailsLink} to={`/posts/${post.id}`}>
                  View details →
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default AllPosts
