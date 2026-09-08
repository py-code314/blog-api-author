/* -------------------- Styles -------------------- */ import styles from './Dashboard.module.css'
/* -------------------- Components -------------------- */
import Profile from '../../components/pages/homepage/profile/Profile'
import RecentPosts from '../../components/pages/homepage/recent-posts/RecentPosts'
import PostsLinks from '../../components/pages/homepage/posts-links/PostsLinks'
import { Link } from 'react-router'

const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboard}>
        <Profile />
        <RecentPosts />
        <PostsLinks/>
        
      </div>
    </>
  )
}

export default Dashboard
