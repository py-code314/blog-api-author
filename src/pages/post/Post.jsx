/* -------------------- Styles -------------------- */
import styles from './Post.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData'
/* -------------------- Components -------------------- */
import { Link, useParams } from 'react-router'
/* -------------------- Icons -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'
/* -------------------- Functions -------------------- */
import parse from 'html-react-parser'

const Post = () => {
  const { id } = useParams()

  // Get a single post data
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/posts/${id}`,
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
      <div className={styles.post}>
        <title>Scriblr | Post</title>

        <Link className={styles.postsLink} to={'/posts'}>
          Back to All Posts
        </Link>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
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

  return (
    <>
      <div className={styles.post}>
        <title>Scriblr | Post</title>

        <Link className={styles.postsLink} to={'/posts'}>
          Back to All Posts
        </Link>

        <h2 className={styles.subTitle}>{title}</h2>
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
        <div>{parse(content)}</div>
        <p>
          <strong>Tags:</strong> {postTags}
        </p>
      </div>
    </>
  )
}

export default Post
