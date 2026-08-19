/* -------------------- Styles -------------------- */
import styles from './NewPost.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect } from 'react'
import { useData } from '../../hooks/useData'
/* -------------------- Icons -------------------- */
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'
/* -------------------- Functions -------------------- */
import {
  validateTitleInput,
  validateContentInput,
  displayEmptyInputErrors,
} from '../../utils/new-post/index.js'
/* -------------------- Components -------------------- */
import Button from '../../components/core/Button/Button.jsx'

const NewPost = () => {
  const titleRef = useRef(null)

  // Get all categories
  const {
    data: categoriesData,
    isLoading: loadingCategories,
    error: categoriesError,
  } = useData('http://localhost:8080/api/v1/categories/all')

  // Get all tags
  const {
    data: tagsData,
    isLoading: loadingTags,
    error: tagsError,
  } = useData('http://localhost:8080/api/v1/tags/all')


  // State variables
  const defaultPostData = {
    title: '',
    content: '',
    categories: [],
    tags: [],
    published: true,
  }
  const [postData, setPostData] = useState(defaultPostData)

  const defaultValidFormData = {
    title: null,
    content: null,
    categories: null,
    tags: null,
    published: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const defaultErrorMsgs = {
    title: '',
    content: '',
    categories: '',
    tags: '',
    published: '',
  }
  const [errorMsgs, setErrorMsgs] = useState(defaultErrorMsgs)
  // const [newPostErrorMsg, setNewPostErrorMsg] = useState('')

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

    validateTitleInput(title, setValidFormData, setErrorMsgs)
  }

  const handleContentChange = (e) => {
    const content = e.target.value

    setPostData((prevPostData) => ({
      ...prevPostData,
      content,
    }))

    validateContentInput(content, setValidFormData, setErrorMsgs)
  }

  const handleCategories = (e) => {
    const options = [...e.target.selectedOptions]
    const values = options.map((option) => option.value)

    // Update categories with category ids
    setPostData((prevPostData) => ({
      ...prevPostData,
      categories: values,
    }))
  }

  const handleTags = (e) => {
    const options = [...e.target.selectedOptions]
    const values = options.map((option) => option.value)

    // Update categories with category ids
    setPostData((prevPostData) => ({
      ...prevPostData,
      tags: values,
    }))
  }

  const handlePublishStatus = (e) => {
    const value = e.target.value
    const published = value === 'yes' ? true : false

    setPostData((prevPostData) => ({
      ...prevPostData,
      published,
    }))
  }

  const validateForm = () => {
    displayEmptyInputErrors(postData, setValidFormData, setErrorMsgs)

    if (validFormData.title === true && validFormData.content === true) {
      return true
    } else {
      return false
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // setNewPostErrorMsg('')
    // const isValid = true
    const isValid = validateForm()
    console.log("🚀 ~ handleFormSubmit ~ isValid:", isValid)

    
  }

  return (
    <>
      <title>Scriblr | New Post</title>
      {/* Keep h2 outside the form for Accessibility */}
      <h2>Create New Post</h2>
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
                {errorMsgs.title}
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
                {errorMsgs.content}
              </p>
            </div>
          )}
        </div>

        {/* Post categories  */}
        {loadingCategories ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        ) : categoriesError ? (
          <p>🚨 Error retrieving categories. Please try again later.</p>
        ) : (
          <div className={styles.formControl}>
            <label htmlFor="categories" className={styles.formLabel}>
              Select Categories:
            </label>

            <select
              name="categories"
              id="categories"
              value={postData.categories}
              onChange={handleCategories}
              multiple={true}
              size={1}>
              {categoriesData.categories &&
                categoriesData.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Post tags  */}
        {loadingTags ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        ) : tagsError ? (
          <p>🚨 Error retrieving tags. Please try again later.</p>
        ) : (
          <div className={styles.formControl}>
            <label htmlFor="tags" className={styles.formLabel}>
              Add Tags:
            </label>

            <select
              name="tags"
              id="tags"
              value={postData.tags}
              onChange={handleTags}
              multiple={true}
              size={1}>
              {tagsData.tags &&
                tagsData.tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Published status */}
        <div className={styles.formControl}>
          <p>Do you want to publish the post now?</p>

          <div>
            <input
              type="radio"
              id="yes"
              name="published"
              value="yes"
              checked={postData.published === true}
              onChange={handlePublishStatus}
            />
            <label htmlFor="yes">Yes, Publish Now</label>
          </div>

          <div>
            <input
              type="radio"
              id="no"
              name="published"
              value="no"
              checked={postData.published === false}
              onChange={handlePublishStatus}
            />
            <label htmlFor="no">No, Save as Draft</label>
          </div>
        </div>

        {/* Publish/Save button */}
        <Button className="publishBtn" title="Publish/Save" type="submit">
          {postData.published ? 'Publish' : 'Save'}
        </Button>
      </form>
    </>
  )
}

export default NewPost
