import styles from './NewPost.module.css'
import { useState, useRef, useEffect } from 'react'
import { useData } from '../../hooks/useData'
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'
import {
  validateTitleInput,
  validateContentInput,
} from '../../utils/new-post/index.js'

const NewPost = () => {
  const titleRef = useRef(null)
  // Get own profile data
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/categories/all',
  )
  console.log('🚀 ~ NewPost ~ error:', error)
  console.log('🚀 ~ NewPost ~ data:', data)

  // State variables
  const defaultPostData = {
    title: '',
    content: '',
    categories: [],
    tags: [],
  }
  const [postData, setPostData] = useState(defaultPostData)

  const defaultValidFormData = {
    title: null,
    content: null,
    categories: null,
    tags: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMessages = {
    title: '',
    content: '',
    categories: '',
    tags: '',
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages)

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [])

  const handleTitleChange = (e) => {
    const title = e.target.value

    setPostData((prevPostData) => ({
      ...prevPostData,
      title,
    }))

    validateTitleInput(title, setValidFormData, setErrorMessages)
  }

  const handleContentChange = (e) => {
    const content = e.target.value

    setPostData((prevPostData) => ({
      ...prevPostData,
      content,
    }))

    validateContentInput(content, setValidFormData, setErrorMessages)
  }

  const handleFormSubmit = () => {}

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    )
  const { categories } = data
  console.log('🚀 ~ NewPost ~ categories:', categories)
  return (
    <>
      <title>Scriblr | New Post</title>
      {/* Keep h2 outside the form for Accessibility */}
      <h2>Create New Blog Post</h2>
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Post title  */}
        <div className={styles.formControl}>
          <label htmlFor="title" className={styles.formLabel}>
            Post Title (required)
          </label>

          <div className={styles.formValid}>
            <input
              type="text"
              name="title"
              id="title"
              className={styles.formInput}
              required
              value={postData.title}
              onChange={handleTitleChange}
              ref={titleRef}
            />
            {validFormData.title && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkMarkIcon}
                alt=""
                width={40}
                height={40}
              />
            )}
          </div>
          {validFormData.title === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={25}
                height={25}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-title">
                {errorMessages.title}
              </p>
            </div>
          )}
        </div>

        {/* Post content  */}
        <div className={styles.formControl}>
          <label htmlFor="content" className={styles.formLabel}>
            Post Content (required)
          </label>

          <div className={styles.formValid}>
            <textarea
              name="content"
              id="content"
              className={styles.formInput}
              rows={10}
              cols={50}
              required
              value={postData.content}
              onChange={handleContentChange}></textarea>
            {validFormData.content && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkMarkIcon}
                alt=""
                width={40}
                height={40}
              />
            )}
          </div>
          {validFormData.content === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={25}
                height={25}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-content">
                {errorMessages.content}
              </p>
            </div>
          )}
        </div>

        {/* Sign up button */}
        {/* <Button
          className="btnSignup"
          title="Signup"
          type="submit"
          disabled={isFormSubmitted}>
          {isFormSubmitted ? 'Submitting...' : 'Submit'}
        </Button> */}
      </form>
    </>
  )
}

export default NewPost
