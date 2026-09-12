/* -------------------- Styles -------------------- */
import styles from './EditPostForm.module.css'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-1.svg'
import publishIcon from '../../../../assets/icons/icon-publish.svg'
import saveIcon from '../../../../assets/icons/icon-save.svg'
import cancelIcon from '../../../../assets/icons/icon-cancel.svg'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useData } from '../../../../hooks/useData.js'
import { useSubmitForm } from '../../../../hooks/useSubmitForm.js'
/* -------------------- Context -------------------- */
import { PostContext } from '../../../../contexts/post/PostContext.jsx'
import { PostFormContext } from '../../../../contexts/post-form/PostFormContext.jsx'
/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button.jsx'
import TextEditor from '../post-content/TextEditor.jsx'
/* -------------------- Functions -------------------- */
import {
  validateTitleInput,
  displayEmptyInputErrors,
  displayServerErrors,
} from '../../../../utils/new-post/index.js'

/* Component to edit a post */
const EditPostForm = () => {
  const { id } = useParams()
  const titleRef = useRef(null)
  const navigate = useNavigate()
  const { currentPostData } = useContext(PostContext)

  // Destructure data
  const { post } = currentPostData
  const { categories, title, content, published, tags } = post
  const categoryIds = categories.map((category) => category.id)
  const tagIds = tags.map((tag) => tag.id)

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
    `http://localhost:8080/api/v1/posts/${id}/update`,
  )

  // State variables
  const defaultPostData = {
    title: title,
    content: content,
    categories: categoryIds,
    tags: tagIds,
    published: published,
  }
  const [postData, setPostData] = useState(defaultPostData)

  const defaultValidFormData = {
    title: true,
    content: true,
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
      navigate(`/posts/${id}`)
    }
  }, [status, data, navigate, id])

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

    if (isValid) {
      const result = await fetchData(postData)

      if (result.success) {
        setPostData({
          title: '',
          content: '',
          categories: [],
          tags: [],
          published: true,
        })
        setValidFormData(defaultValidFormData)
        setErrorMsgs(defaultErrorMsgs)
      } else if (!result.validData) {
        displayServerErrors(result.errors, setValidFormData, setErrorMsgs)
      }
    }
  }

  const handleCancel = () => {
    setPostData(defaultPostData)
    setValidFormData(defaultValidFormData)
    setErrorMsgs(defaultErrorMsgs)
    navigate(`/posts/${id}`)
  }

  return (
    <>
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
            Content (required)
          </label>
          <div className={styles.formValid}>
            <PostFormContext
              value={{
                postData,
                setPostData,
                setValidFormData,
                setErrorMsgs,
              }}>
              {/* Use TinyMCE text editor for content */}
              <TextEditor />
            </PostFormContext>
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
                value={postData.categories || categoryIds}
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
                value={postData.tags || tagIds}
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

        <div className={styles.btns}>
          {/* Publish/Save button */}
          <Button className="publishBtn" title="Publish/Save" type="submit">
            {status === 'fetching' ? (
              postData.published ? (
                <>
                  <img src={publishIcon} alt="" width={20} height={20} />{' '}
                  Publishing
                </>
              ) : (
                <>
                  <img src={saveIcon} alt="" width={20} height={20} /> Saving
                </>
              )
            ) : postData.published ? (
              <>
                <img src={publishIcon} alt="" width={20} height={20} /> Publish
              </>
            ) : (
              <>
                <img src={saveIcon} alt="" width={20} height={20} /> Save
              </>
            )}
          </Button>
          {/* Cancel button  */}
          <Button className="abortBtn" title="Cancel" onClick={handleCancel}>
            <img src={cancelIcon} alt="" width={20} height={20} />
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditPostForm
