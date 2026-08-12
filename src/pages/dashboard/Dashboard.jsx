import styles from './Dashboard.module.css'
import { AuthContext } from '../../contexts/auth/AuthContext'
import { useContext } from 'react'
import Profile from '../../components/pages/homepage/profile/Profile'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <div className={styles.dashboard}>
        <h2 className={styles.subtitle}>Welcome {user.name || user.email}</h2>
        <Profile />
      </div>
    </>
  )
}

export default Dashboard
