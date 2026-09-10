/* -------------------- Styles -------------------- */
import styles from './EditPost.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData.js'
import { useParams } from 'react-router'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import EditPostForm from '../../../components/forms/post/edit-post/EditPostForm.jsx'
/* -------------------- Images -------------------- */
import errorIcon2 from '../../../assets/icons/icon-error-2.svg'
/* -------------------- Context -------------------- */
import { PostContext } from '../../../contexts/post/PostContext.jsx'

const EditPost = () => {
  const { id } = useParams()

  // Get a single post data
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

        <Link className={styles.postLink} to={`/posts/${id}`}>
          Back to Post
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
      <div className={styles.editPost}>
        <title>Scriblr | Edit Post</title>
        {/* Keep h2 outside the form for Accessibility */}
        <div className={styles.header}>
          <h2 className={styles.subTitle}>Edit Post</h2>
          <Link className={styles.cancelLink} to={`/posts/${id}`}>
            Cancel Edit
          </Link>
        </div>

        <PostContext
          value={{
            currentPostData,
          }}>
          <EditPostForm />
        </PostContext>
      </div>
    </>
  )
}

export default EditPost
