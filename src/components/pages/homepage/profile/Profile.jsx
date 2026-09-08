import styles from './Profile.module.css'
import { useData } from '../../../../hooks/useData.js'
import profileIcon from '../../../../assets/icons/icon-profile-2.svg'
import errorIcon from '../../../../assets/icons/icon-error-2.svg'

const Profile = () => {
  // Get own profile data
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/profiles/me',
  )

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    )

  // TODO FIX: Fix error styles
  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.profile}>
        <div className={styles.imageContainer}>
          <img
            className={styles.profileIcon}
            src={profileIcon}
            alt=""
            width={128}
            height={128}
          />
        </div>
        <div className={styles.errorWrapper}>
          <img
            className={styles.errorImage}
            src={errorIcon}
            alt=""
            width={40}
            height={40}
          />

          <p className={styles.errorContent}>
            Looks like our servers temporarily forgot who you are! Please try
            again later.
          </p>
        </div>
      </div>
    )

  const { profile } = data
  const { bio, user } = profile

  return (
    <>
      <div className={styles.profile}>
        <h2 className={styles.subtitle}>Welcome {user.name || user.email}</h2>
        <div className={styles.profileWrapper}>
          <div className={styles.imageContainer}>
            <img
              className={styles.profileIcon}
              src={profileIcon}
              alt=""
              width={128}
              height={128}
            />
          </div>
          <div className={styles.details}>
            <p>
              <strong>Name: </strong>
              {user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Bio: </strong>
              {bio}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
