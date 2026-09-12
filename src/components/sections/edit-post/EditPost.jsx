/* -------------------- Styles -------------------- */
import styles from './EditPost.module.css'
/* -------------------- Icons -------------------- */
import errorIcon2 from '../../../assets/icons/icon-error-2.svg'
import backIcon from '../../../assets/icons/icon-arrow-back.svg'
/* -------------------- Hooks -------------------- */
import { useParams } from 'react-router'
import { useData } from '../../../hooks/useData.js'
/* -------------------- Context -------------------- */
import { PostContext } from '../../../contexts/post/PostContext.jsx'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import EditPostForm from '../../../components/forms/post/edit-post/EditPostForm.jsx'

/* Component to get a single post data */
const EditPost = () => {
  const { id } = useParams()

  // Get post data
  const {
    data: currentPostData,
    isLoading,
    error,
  } = useData(`http://localhost:8080/api/v1/posts/${id}`)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.editPost}>
        <title>Scriblr | Edit Post</title>

        <div className={styles.loaderWrapper}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.editPost}>
        <title>Scriblr | Edit Post</title>

        {/* Link to go back to post  */}
        <Link className={styles.postLink} to={`/posts/${id}`}>
          <img src={backIcon} alt="" width={18} height={18} />
          Post
        </Link>

        <h2 className={styles.subTitle}>Edit Post</h2>
        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon2} alt="" width={60} height={60} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving post info. Please try again.</p>
          </div>
        </div>
      </div>
    )

  return (
    <>
      <section className={styles.editPost}>
        <title>Scriblr | Edit Post</title>
        {/* Keep h2 outside the form for Accessibility */}
        <div className={styles.header}>
          <h2 className={styles.subTitle}>Edit Post</h2>
          {/* // TODO: Delete this link  */}
          {/* <Link className={styles.cancelLink} to={`/posts/${id}`}>
            Cancel Edit
          </Link> */}
        </div>

        <PostContext
          value={{
            currentPostData,
          }}>
          <EditPostForm />
        </PostContext>
      </section>
    </>
  )
}

export default EditPost
