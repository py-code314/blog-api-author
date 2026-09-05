/* -------------------- Styles -------------------- */
import styles from './Sidebar.module.css'
/* -------------------- Components -------------------- */
import { NavLink } from 'react-router'
/* -------------------- Images -------------------- */
import createIcon from '../../../assets/icons/icon-create.svg'
import blogsIcon from '../../../assets/icons/icon-blogs.svg'
import categoriesIcon from '../../../assets/icons/icon-categories.svg'
import tagsIcon from '../../../assets/icons/icon-tags.svg'
import profileIcon from '../../../assets/icons/icon-profile.svg'
import settingsIcon from '../../../assets/icons/icon-settings.svg'
import helpIcon from '../../../assets/icons/icon-help.svg'

const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        {/* Navigation links */}
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              {/* Add post link  */}
              <NavLink
                className={`${styles.navLink} ${styles.createLink}`}
                to={'/new-post'}>
                <img src={createIcon} alt="" width={32} height={32} />
                Create Post
              </NavLink>
            </li>
            {/* Posts link  */}
            <li className={styles.navItem}>
              <NavLink
                className={`${styles.navLink} ${styles.paddedLink}`}
                to={'/posts'}>
                <img src={blogsIcon} alt="" width={30} height={30} />
                Posts
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* Categories link  */}
              <NavLink className={styles.navLink} to={'/categories'}>
                <img src={categoriesIcon} alt="" width={30} height={30} />
                Categories
              </NavLink>
            </li>
            <li className={styles.navItem}>
              {/* Tags link  */}
              <NavLink className={`${styles.navLink} ${styles.paddedLink}`}>
                <img src={tagsIcon} alt="" width={30} height={30} />
                Tags
              </NavLink>
            </li>
          </ul>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.navLink}`}>
              <img src={profileIcon} alt="" width={30} height={30} />
              Profile
            </li>
            <li className={`${styles.navItem} ${styles.navLink}`}>
              <img src={settingsIcon} alt="" width={30} height={30} />
              Settings
            </li>
            <li className={`${styles.navItem} ${styles.navLink}`}>
              <img src={helpIcon} alt="" width={30} height={30} />
              Help
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
