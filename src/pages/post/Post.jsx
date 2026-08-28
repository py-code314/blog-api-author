/* -------------------- Styles -------------------- */
import styles from './Post.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../components/core/Button/Button'
import ErrorMessage from '../../components/pages/homepage/error/ErrorMessage'
/* -------------------- Images -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'
/* -------------------- Context -------------------- */
import { ErrorContext } from '../../contexts/error/ErrorContext'

const Post = () => {
  const { id } = useParams()
  let navigate = useNavigate()

  // Get a single post data
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/posts/${id}`,
  )

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
          Back to All Posts
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

  const { post } = data
  const { categories, title, content, published, createdAt, updatedAt, tags } =
    post

  const dateCreated = new Date(createdAt).toLocaleString()
  const dateUpdated = new Date(updatedAt).toLocaleString()

  let postCategories = categories.map((category) => category.name)
  postCategories = postCategories.join(', ')

  const status = published === true ? 'Published' : 'Draft'

  let postTags = tags.map((tag) => tag.name)
  postTags = postTags.join(', ')

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

      // throw new Error()
      const result = await response.json()
      // console.log('🚀 ~ handleDeletePost ~ result:', result)
      if (result.success) {
        navigate('/posts')
      } else {
        setDeleteError({
          code: result.errorCode,
          title: result.errorTitle,
          msg: result.errorMessage,
        })
      }
    } catch (error) {
      console.error(error)
      setDeleteError({
        code: 'NET_ERR',
        title: 'Network Error',
        msg: 'Failed to connect to the server. Please try again.',
      })
    }
  }
  const handleDismiss = () => {
    setDeleteError(null)
  }

  return (
    <>
      <div className={styles.post}>
        <title>Scriblr | Post</title>

        <Link className={styles.postsLink} to={'/posts'}>
          Back to All Posts
        </Link>

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
              Edit
            </Button>
            {/* Delete button */}
            <Button
              className="deleteBtn"
              title="Delete post"
              onClick={() => handleDeletePost(post.id)}>
              Delete
            </Button>
          </div>
        </div>
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
