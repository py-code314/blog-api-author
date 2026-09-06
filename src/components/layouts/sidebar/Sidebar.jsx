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
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={'/new-post'}>
                {({ isActive }) => (
                  <>
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={createIcon}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span>Create Post</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className={styles.navItem}>
            {/* Posts link  */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={'/posts'}>
                {({ isActive }) => (
                  <>
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={blogsIcon}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span>Posts</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className={styles.navItem}>
              {/* Categories link  */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={'/categories'}>
                {({ isActive }) => (
                  <>
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={categoriesIcon}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span>Categories</span>
                  </>
                )}
              </NavLink>
            </li>
            
            <li className={styles.navItem}>
              {/* Tags link  */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={'/tags'}>
                {({ isActive }) => (
                  <>
                    <img
                      className={`${isActive ? styles.activeIcon : ''}`}
                      src={tagsIcon}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <span>Tags</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
          
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
              <img
                className={styles.helpIcon}
                src={profileIcon}
                alt=""
                width={30}
                height={30}
              />
              Profile
            </li>
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
              <img
                className={styles.helpIcon}
                src={settingsIcon}
                alt=""
                width={30}
                height={30}
              />
              Settings
            </li>
            <li className={`${styles.navItem} ${styles.inactiveLink}`}>
              <img
                className={styles.helpIcon}
                src={helpIcon}
                alt=""
                width={30}
                height={30}
              />
              Help
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
