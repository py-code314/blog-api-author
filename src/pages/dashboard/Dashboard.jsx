import styles from './Dashboard.module.css'
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useContext } from 'react';

const Dashboard = ({ children }) => {
  const { user } = useContext(AuthContext)
  
  return ( 
    <>
      <h2 className={styles.subtitle}>Welcome { user.name }</h2>
    {children}
    </>
   );
}
 
export default Dashboard;