/* -------------------- Styles -------------------- */
import styles from './EditPost.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData.js'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Images -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'

const EditPost = () => {
  // ? Use code from new post form
  // TODO: Get post data from db
  // Populate form with post data

  // TODO: Get id using params
  // Get post data using that id
  // * Use code from Post.jsx

  const { id } = useParams()

  // Get a single post data
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/posts/${id}`,
  )

  // const [deleteError, setDeleteError] = useState(null)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}>Loading...</div>
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
            <img src={errorIcon} alt="" width={60} height={60} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving post info. Please try again.</p>
          </div>
        </div>
      </div>
    )

  const { post } = data
  const { categories, title, content, published, createdAt, updatedAt, tags } =
    post
  return (
    <>
      <h2 className={styles.subTitle}>Edit Post</h2>
    </>
  )
}

export default EditPost
