/* -------------------- Styles -------------------- */
import styles from './Post.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-2.svg'
import editIcon from '../../../assets/icons/icon-edit.svg'
import deleteIcon from '../../../assets/icons/icon-delete.svg'
import backIcon from '../../../assets/icons/icon-arrow-back.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useData } from '../../../hooks/useData'
/* -------------------- Context -------------------- */
import { ErrorContext } from '../../../contexts/error/ErrorContext'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../../components/core/button/Button'
import ErrorMessage from '../../../components/core/error/ErrorMessage'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

/* Show post details */
const Post = () => {
  const { id } = useParams()
  let navigate = useNavigate()

  // Get a single post data
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/posts/me/${id}`,
  )

  // State variables
  const [deleteError, setDeleteError] = useState(null)

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
      <div className={styles.post}>
        <title>Scriblr | Post</title>

        <Link className={styles.postsLink} to={'/posts'}>
          <img src={backIcon} alt="" width={17} height={17} />
          All Posts
        </Link>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={60} height={60} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving the post. Please try again later.</p>
          </div>
        </div>
      </div>
    )

  // Destructure data
  const { post } = data
  const { categories, title, content, published, createdAt, updatedAt, tags } =
    post

  // Computed variables
  const dateCreated = new Date(createdAt).toLocaleString()
  const dateUpdated = new Date(updatedAt).toLocaleString()

  let postCategories = categories.map((category) => category.name)
  postCategories = postCategories.join(', ')

  const status = published === true ? 'Published' : 'Draft'

  let postTags = tags.map((tag) => tag.name)
  postTags = postTags.join(', ')

  // Handler functions
  const handleEditPost = (id) => {
    navigate(`/posts/${id}/edit`)
  }

  const handleDeletePost = async (id) => {
    const authToken = localStorage.getItem('jwtToken')
    setDeleteError(null)

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/posts/${id}/delete`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      const result = await response.json()

      if (result.success) {
        navigate('/posts')
      } else {
        // Server errors
        setDeleteError({
          code: result.errorCode,
          title: result.errorTitle,
          msg: result.errorMessage,
        })
      }
    } catch (error) {
      console.error(error)
      // Network errors
      setDeleteError({
        code: 'NET_ERR',
        title: 'Network Error',
        msg: 'Failed to connect to the server. Please try again.',
      })
    }
  }

  // Handler to dismiss error msg
  const handleDismiss = () => {
    setDeleteError(null)
  }

  return (
    <>
      <div className={styles.post}>
        <title>Scriblr | Post</title>

        <div className={styles.links}>
          {/* Link to all posts  */}
          <Link className={styles.postsLink} to={'/posts'}>
            <img src={backIcon} alt="" width={17} height={17} /> All Posts
          </Link>
          {/* Link to home  */}
          <Link className={styles.homeLink} to={'/'}>
            Home
          </Link>
        </div>

        {/* Show error msg when deleting a post fails */}
        {deleteError && (
          <ErrorContext
            value={{
              deleteError,
              handleDismiss,
            }}>
            <ErrorMessage />
          </ErrorContext>
        )}

        <div className={styles.header}>
          <h2 className={styles.subTitle}>{title}</h2>
          <div className={styles.btns}>
            {/* Edit button */}
            <Button
              className="editBtn"
              title="Edit post"
              onClick={() => handleEditPost(post.id)}>
              <img src={editIcon} alt="" width={20} height={20} />
              Edit
            </Button>
            {/* Delete button */}
            <Button
              className="deleteBtn"
              title="Delete post"
              onClick={() => handleDeletePost(post.id)}>
              <img src={deleteIcon} alt="" width={20} height={20} />
              Delete
            </Button>
          </div>
        </div>
        {/* Post details  */}
        <div className={styles.details}>
          <p>
            <strong>Created on:</strong> {dateCreated}
          </p>
          <p>
            <strong>Updated on:</strong> {dateUpdated}
          </p>
          <p>
            <strong>Categories:</strong> {postCategories}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
        <div className={styles.content}>{parse(content)}</div>
        <p>
          <strong>Tags:</strong> {postTags}
        </p>
      </div>
    </>
  )
}

export default Post
