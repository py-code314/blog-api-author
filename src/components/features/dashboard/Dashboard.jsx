/* -------------------- Styles -------------------- */
import styles from './Dashboard.module.css'
/* -------------------- Components -------------------- */
import Profile from '../../../components/sections/profile/Profile'
import RecentPosts from '../../../components/sections/recent-posts/RecentPosts'
import PostsLinks from '../../../components/sections/posts-links/PostsLinks'
import AllStats from '../../../components/sections/stats/AllStats'

/* Show dashboard immediately upon login */
const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboard}>
        <Profile />
        <RecentPosts />
        <PostsLinks />
        <AllStats />
      </div>
    </>
  )
}

export default Dashboard
