import styles from './Dashboard.module.css'
import Profile from '../../components/pages/homepage/profile/Profile'

const Dashboard = () => {
  return (
    <>
      <div className={styles.dashboard}>
        <Profile />
      </div>
    </>
  )
}

export default Dashboard
