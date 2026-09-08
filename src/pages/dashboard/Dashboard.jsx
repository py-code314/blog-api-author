/* -------------------- Styles -------------------- */ import styles from './Dashboard.module.css'
/* -------------------- Components -------------------- */
import Profile from '../../components/pages/homepage/profile/Profile'
import RecentPosts from '../../components/pages/homepage/recent-posts/RecentPosts'
import { Link } from 'react-router'

const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboard}>
        <Profile />
        <RecentPosts />
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
      </div>
    </>
  )
}

export default Dashboard
