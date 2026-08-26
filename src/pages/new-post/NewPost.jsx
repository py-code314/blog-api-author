/* -------------------- Styles -------------------- */
import styles from './NewPost.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect } from 'react'
import { useData } from '../../hooks/useData'
import { useSubmitForm } from '../../hooks/useSubmitForm.js'
import { useNavigate } from 'react-router'
/* -------------------- Icons -------------------- */
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'
/* -------------------- Functions -------------------- */
import {
  validateTitleInput,
  // validateContentInput,
  displayEmptyInputErrors,
  displayServerErrors,
} from '../../utils/new-post/index.js'
/* -------------------- Context -------------------- */
import { NewPostContext } from '../../contexts/new-post/NewPost.jsx'
/* -------------------- Components -------------------- */
import Button from '../../components/core/Button/Button.jsx'
import TextEditor from '../../components/forms/text-editor/TextEditor.jsx'

const NewPost = () => {
  const titleRef = useRef(null)
  let navigate = useNavigate()

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

  const [fetchData, status, data] = useSubmitForm(
    'http://localhost:8080/api/v1/posts/new',
  )
  // console.log('🚀 ~ NewPost ~ data:', data)
  // console.log('🚀 ~ NewPost ~ status:', status)

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

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (data?.success) {
      navigate('/posts')
    }
  }, [status, data, navigate])

  const handleTitleChange = (e) => {
    const title = e.target.value

    setPostData((prevPostData) => ({
      ...prevPostData,
      title,
    }))

    validateTitleInput(title, setValidFormData, setErrorMsgs)
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
    const published = value === 'yes' ? true : value === 'no' ? false : null
    // const published = value === 'yes' ? true : false

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
    // const isValid = true
    const isValid = validateForm()
    // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (isValid) {
      const result = await fetchData(postData)
      // console.log('🚀 ~ handleFormSubmit ~ result:', result)

      if (result.success) {
        setPostData(defaultPostData)
        setValidFormData(defaultValidFormData)
        setErrorMsgs(defaultErrorMsgs)
      } else if (!result.validData) {
        displayServerErrors(result.errors, setValidFormData, setErrorMsgs)
      }
    }
  }

  return (
    <>
      <div className={styles.newPost}>
        <title>Scriblr | New Post</title>
        {/* Keep h2 outside the form for Accessibility */}
        <h2 className={styles.subTitle}>Create New Post</h2>
        <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
          {/* Title  */}
          <div className={styles.formControl}>
            <label htmlFor="title" className={styles.formLabel}>
              Title (required)
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

          {/* Content  */}
          <div className={styles.formControl}>
            <label htmlFor="content" className={styles.formLabel}>
              Post Content (required)
            </label>
            <div className={styles.formValid}>
              <NewPostContext
                value={{
                  postData,
                  setPostData,
                  setValidFormData,
                  setErrorMsgs,
                }}>
                <TextEditor />
              </NewPostContext>
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

          {/* Categories  */}
          {loadingCategories ? (
            <div className={styles.loaderWrapper}>
              <div className={styles.loader}></div>
            </div>
          ) : categoriesError ? (
            <p>🚨 Error retrieving categories. Please try again later.</p>
          ) : (
            <div className={`${styles.formControl} ${styles.categories}`}>
              <label htmlFor="categories" className={styles.formLabel}>
                Select Categories:
              </label>
              <div className={styles.formValid}>
                <select
                  name="categories"
                  id="categories"
                  className={`${styles.formInput} ${styles.formSelect}`}
                  value={postData.categories}
                  onChange={handleCategories}
                  multiple={true}
                  size={1}>
                  {categoriesData.categories &&
                    categoriesData.categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className={styles.formOption}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {validFormData.categories && (
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
              {validFormData.categories === false && (
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
                    id="invalid-categories">
                    {errorMsgs.categories}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tags  */}
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
              <div className={styles.formValid}>
                <select
                  name="tags"
                  id="tags"
                  className={`${styles.formInput} ${styles.formSelect}`}
                  value={postData.tags}
                  onChange={handleTags}
                  multiple={true}
                  size={1}>
                  {tagsData.tags &&
                    tagsData.tags.map((tag) => (
                      <option
                        key={tag.id}
                        value={tag.id}
                        className={styles.formOption}>
                        {tag.name}
                      </option>
                    ))}
                </select>
                {validFormData.tags && (
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
              {validFormData.tags === false && (
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
                    id="invalid-tags">
                    {errorMsgs.tags}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Published status */}
          <div className={styles.formControl}>
            <p className={styles.formLabel}>
              Do you want to publish the post now?
            </p>
            <div className={styles.formValid}>
              <div className={styles.formGroupRadio}>
                <label htmlFor="yes" className={styles.formLabelRadio}>
                  <input
                    type="radio"
                    id="yes"
                    className={styles.formInputRadio}
                    name="published"
                    value="yes"
                    checked={postData.published === true}
                    onChange={handlePublishStatus}
                  />
                  Yes, Publish Now
                </label>
                <label htmlFor="no" className={styles.formLabelRadio}>
                  <input
                    type="radio"
                    id="no"
                    className={styles.formInputRadio}
                    name="published"
                    value="no"
                    checked={postData.published === false}
                    onChange={handlePublishStatus}
                  />
                  No, Save as Draft
                </label>
              </div>
              {validFormData.published && (
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
            {validFormData.published === false && (
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
                  id="invalid-published">
                  {errorMsgs.published}
                </p>
              </div>
            )}
          </div>

          {/* Publish/Save button */}
          <Button className="publishBtn" title="Publish/Save" type="submit">
            {status === 'fetching'
              ? postData.published
                ? 'Publishing'
                : 'Saving'
              : postData.published
                ? 'Publish'
                : 'Save'}
          </Button>
        </form>
      </div>
    </>
  )
}

export default NewPost
