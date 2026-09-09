/* -------------------- Styles -------------------- */
import styles from './Dashboard.module.css'
/* -------------------- Components -------------------- */
import Profile from '../../components/sections/homepage/dashboard/profile/Profile'
import RecentPosts from '../../components/sections/homepage/dashboard/recent-posts/RecentPosts'
import PostsLinks from '../../components/sections/homepage/dashboard/posts-links/PostsLinks'
import AllStats from '../../components/sections/homepage/dashboard/stats/AllStats'

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
