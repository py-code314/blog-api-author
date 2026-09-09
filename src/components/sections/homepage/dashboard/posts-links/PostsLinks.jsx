/* -------------------- Styles -------------------- */ import styles from './PostsLinks.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

const PostsLinks = () => {
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          {/* Link to posts  */}
          <Link className={styles.posts} to={'/posts'}>
            All Posts
            <span className={styles.rightArrow}>→</span>
          </Link>
        </li>
        <li className={styles.listItem}>
          {/* Link to published posts  */}
          <Link className={styles.publishedPosts} to={'/posts/published'}>
            Published Posts
            <span className={styles.rightArrow}>→</span>
          </Link>
        </li>
        <li className={styles.listItem}>
          {/* Link to drafts  */}
          <Link className={styles.drafts} to={'/posts/drafts'}>
            Drafts
            <span className={styles.rightArrow}>→</span>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default PostsLinks
