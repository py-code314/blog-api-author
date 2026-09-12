/* -------------------- Styles -------------------- */
import styles from './Sidebar.module.css'
/* -------------------- icons -------------------- */
import createIcon from '../../../assets/icons/icon-create.svg'
import blogsIcon from '../../../assets/icons/icon-blogs.svg'
import categoriesIcon from '../../../assets/icons/icon-categories.svg'
import tagsIcon from '../../../assets/icons/icon-tags.svg'
import profileIcon from '../../../assets/icons/icon-profile-1.svg'
import settingsIcon from '../../../assets/icons/icon-settings.svg'
import helpIcon from '../../../assets/icons/icon-help.svg'
/* -------------------- Components -------------------- */
import { NavLink } from 'react-router'

/* Component to show sidebar */
const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        {/* Navigation links */}
        <nav className={styles.navbar}>
          <ul className={styles.navList}>

            <li className={styles.navItem}>
              {/* Link to show 'add post form'  */}
              {/* Use 'NavLink' to apply active styles to the link */}
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                to={'/new-post'}>
                {({ isActive }) => (
                  <>
                    {/* Apply active styles to icon too if the link is clicked */}
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
            {/* Link to show all posts  */}
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
          
          {/* Placeholder links */}
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
