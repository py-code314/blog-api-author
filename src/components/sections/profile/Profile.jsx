/* -------------------- Styles -------------------- */
import styles from './Profile.module.css'
/* -------------------- Icons -------------------- */
import profileIcon from '../../../assets/icons/icon-profile-2.svg'
import errorIcon from '../../../assets/icons/icon-error-2.svg'
// import editIcon from '../../../assets/icons/icon-edit.svg'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData.js'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button.jsx'

/* Component to show profile */
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

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.profileError}>
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

  // Destructure data
  const { profile } = data
  const { bio, user } = profile

  const handleAddBio = () => {}

  return (
    <>
      <section className={styles.profile}>
        <h2 className={styles.subtitle}>Welcome {user.name || user.email}</h2>
        <div className={styles.profileWrapper}>
          {/* Profile image  */}
          <div className={styles.imageContainer}>
            <img
              className={styles.profileIcon}
              src={profileIcon}
              alt=""
              width={128}
              height={128}
            />
          </div>

          {/* Profile info  */}
          <div className={styles.details}>
            <p>
              <strong>Name: </strong>
              {user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>

            {bio ? (
              <p>
                <strong>Bio: </strong>bio
              </p>
            ) : (
              // Add button
              <Button
                className="addBioBtn"
                title="Add bio"
                onClick={handleAddBio}>
                Add Bio
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
