/* -------------------- Styles -------------------- */
import styles from './PostsLinks.module.css'
/* -------------------- Icons -------------------- */
import forwardIcon from '../../../assets/icons/icon-arrow-forward.svg'
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
            <Link className={styles.link} to={'/posts'}>
              All Posts
              <img className={styles.rightArrow} src={forwardIcon} alt="" width={18} height={18} />
            </Link>
          </li>
          <li className={styles.listItem}>
            {/* Link to published posts  */}
            <Link className={styles.link} to={'/posts/published'}>
              Published Posts
              <img className={styles.rightArrow}  src={forwardIcon} alt="" width={18} height={18} />
            </Link>
          </li>
          <li className={styles.listItem}>
            {/* Link to drafts  */}
            <Link className={styles.link} to={'/posts/drafts'}>
              Drafts
              <img className={styles.rightArrow}  src={forwardIcon} alt="" width={18} height={18} />
            </Link>
          </li>
        </ul>
      </section>
    </>
  )
}

export default PostsLinks
