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
        <ul>
          <li>
            {/* Posts link  */}
            <Link className={styles.posts} to={'/posts'}>
              Go to All Posts
              <span>→</span>
            </Link>
          </li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  )
}

export default Dashboard
