/* -------------------- Styles -------------------- */
import styles from './EditPost.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData.js'
import { useNavigate, useParams } from 'react-router'
import { useState, useRef, useEffect } from 'react'
import { useSubmitForm } from '../../hooks/useSubmitForm.js'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'
import errorIcon2 from '../../assets/icons/icon-error-2.svg'
/* -------------------- Context -------------------- */
import { PostContext } from '../../contexts/post/PostContext.jsx'
/* -------------------- Components -------------------- */
import Button from '../../components/core/Button/Button.jsx'
import TextEditor from '../../components/forms/text-editor/TextEditor.jsx'

const EditPost = () => {
  // ? Use code from new post form
  // TODO: Get post data from db
  // Populate form with post data

  // TODO: Get id using params
  // Get post data using that id
  // * Use code from Post.jsx

  const { id } = useParams()
  const titleRef = useRef(null)

  // State variables
  const defaultPostData = {
    title: '',
    content: '',
    categories: null,
    tags: null,
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

  // Get a single post data
  const {
    data: currentPostData,
    isLoading,
    error,
  } = useData(`http://localhost:8080/api/v1/posts/${id}`)

  // const [fetchData, status, data] = useSubmitForm(
  //   ` http://localhost:8080/api/v1/posts/${id}/update`,
  // )

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [])

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
            <img src={errorIcon2} alt="" width={60} height={60} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving post info. Please try again.</p>
          </div>
        </div>
      </div>
    )

  const { post } = currentPostData
  console.log('🚀 ~ EditPost ~ post:', post)
  // * This is printing too many time/ component rendering too many times
  // ? Is there a way for the component to not render too many times like call all 'useData' hooks at the same time instead of calling them multiple times
  const { categories, title, content, published, tags } = post
  // console.log("🚀 ~ EditPost ~ categories:", categories)
  const categoryIds = categories.map((category) => category.id)
  // console.log("🚀 ~ EditPost ~ categoryIds:", categoryIds)
  const tagIds = tags.map((tag) => tag.id)

  const handleFormSubmit = () => {}
  const handleTitleChange = () => {}
  const handleCategories = () => {}
  const handleTags = () => {}
  const handlePublishStatus = () => {}

  // TODO: Redirect to post after successful editing

  return (
    <>
      <div className={styles.editPost}>
        <title>Scriblr | Edit Post</title>
        {/* Keep h2 outside the form for Accessibility */}
        <h2 className={styles.subTitle}>Edit Post</h2>
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
                value={postData.title || title}
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
              <PostContext
                value={{
                  content,
                  postData,
                  setPostData,
                  setValidFormData,
                  setErrorMsgs,
                }}>
                <TextEditor />
              </PostContext>
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
                    checked={published}
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

export default EditPost
