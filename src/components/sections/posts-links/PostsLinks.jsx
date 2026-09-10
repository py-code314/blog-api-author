/* -------------------- Styles -------------------- */
import styles from './PostsLinks.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Component to display links to all posts, unpublished posts, and
draft posts */
const PostsLinks = () => {
  return (
    <>
      <section>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            {/* Link to posts  */}
            {/* // TODO: Add arrows to all links  */}
            <Link className={styles.link} to={'/posts'}>
              All Posts
              <span className={styles.rightArrow}>→</span>
            </Link>
          </li>
          <li className={styles.listItem}>
            {/* Link to published posts  */}
            <Link className={styles.link} to={'/posts/published'}>
              Published Posts
              <span className={styles.rightArrow}>→</span>
            </Link>
          </li>
          <li className={styles.listItem}>
            {/* Link to drafts  */}
            <Link className={styles.link} to={'/posts/drafts'}>
              Drafts
              <span className={styles.rightArrow}>→</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  )
}

export default PostsLinks
