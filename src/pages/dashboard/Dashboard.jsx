import styles from './Dashboard.module.css'
import Profile from '../../components/pages/homepage/profile/Profile'
import RecentPosts from '../../components/pages/homepage/recent-posts/RecentPosts'

const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboard}>
        <Profile />
        <RecentPosts/>
      </div>
    </>
  )
}

export default Dashboard
