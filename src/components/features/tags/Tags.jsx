/* -------------------- Styles -------------------- */
import styles from './Tags.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData'
import { useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../../components/core/Button/Button'
import ErrorMessage from '../../../components/core/error/ErrorMessage'
import EditTag from '../../sections/edit-tag/EditTag'
import AddTagForm from '../../../components/forms/tag/add-tag/AddTagForm'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-2.svg'
/* -------------------- Context -------------------- */
import { ErrorContext } from '../../../contexts/error/ErrorContext'
import { TagContext } from '../../../contexts/tag/TagContext'

const Tags = () => {
  // State variables
  // To add error msg
  const [deleteError, setDeleteError] = useState(null)
  // To display error msg or edit form only for that particular tag
  const [tagId, setTagId] = useState(null)
  // To display 'add new tag form'
  const [isNew, setIsNew] = useState(false)
  // To display 'edit tag form'
  const [isEdit, setIsEdit] = useState(false)
  // To re-render tags after deleting a tag
  const [isDelete, setIsDelete] = useState(false)

  // Pass 'isEdit', 'isNew' and 'isDelete' as arguments to run useData second time to get updated values of tags from db
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/tags/all',
    { isEdit, isNew, isDelete },
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
      <div className={styles.tags}>
        <title>Scriblr | Tags</title>
        <h2 className={styles.subTitle}>Tags</h2>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving tags. Please try again later.</p>
          </div>
        </div>
        <Link className={styles.homeLink} to={'/'}>
          <span className={styles.backIcon}>←</span>Back to Home
        </Link>
      </div>
    )

  const handleAddTag = () => {
    setIsNew(true)
  }

  const handleDeleteTag = async (id) => {
    // Author should be logged in to delete a tag
    const authToken = localStorage.getItem('jwtToken')
    setDeleteError(null)
    setTagId(null)
    setIsDelete(false)

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/tags/${id}/delete`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      const result = await response.json()
      // console.log('🚀 ~ handleDeletePost ~ result:', result)
      if (result.success) {
        setIsDelete(true)
        setDeleteError(null)
        setTagId(null)
      } else {
        // Show error msgs from server under that particular tag
        setDeleteError({
          code: result.errorCode,
          title: result.errorTitle,
          msg: result.errorMessage,
        })
        setTagId(id)
        setIsDelete(false)
      }
    } catch (error) {
      console.error(error)
      // Catch and show error msgs other than those from server
      setDeleteError({
        code: 'NET_ERR',
        title: 'Network Error',
        msg: 'Failed to connect to the server. Please try again.',
      })
      setTagId(id)
      setIsDelete(false)
    }
  }

  // Handle Dismiss button inside the error msg
  const handleDismiss = () => {
    setDeleteError(null)
    setTagId(null)
  }

  const handleEditTag = (id) => {
    setIsEdit(true)
    setTagId(id)
  }

  return (
    <>
      <div className={styles.tags}>
        <title>Scriblr | Tags</title>
        <h2 className={styles.subTitle}>Tags</h2>

        {/* Add button */}
        <Button className="addBtn" title="Add tag" onClick={handleAddTag}>
          Add Tag
        </Button>

        {/* Display 'add tag form' conditionally */}
        {isNew && (
          <TagContext
            value={{
              setIsNew,
            }}>
            <AddTagForm />
          </TagContext>
        )}

        <ul className={styles.tagList}>
          {data.tags.length > 0 &&
            data.tags.map((tag) => (
              <div key={tag.id} className={styles.tagWrapper}>
                {/* Display 'edit tag form' conditionally and only for that particular tag  */}
                {isEdit && tag.id === tagId ? (
                  <TagContext
                    value={{
                      tagId,
                      setIsEdit,
                    }}>
                    <EditTag />
                  </TagContext>
                ) : (
                  <li className={styles.tag}>
                    <p className={styles.name}>{tag.name}</p>
                    <div className={styles.actionGroup}>
                      {/* Edit button */}
                      <Button
                        className="editBtn"
                        title="Edit tag"
                        onClick={() => handleEditTag(tag.id)}>
                        Edit
                      </Button>
                      {/* Delete button */}
                      <Button
                        className="deleteBtn"
                        title="Delete tag"
                        onClick={() => handleDeleteTag(tag.id)}>
                        Delete
                      </Button>
                    </div>
                  </li>
                )}

                {/* Show error msg if deleting a tag fails. Display it conditionally and only under that particular tag  */}
                {tag.id === tagId && deleteError && (
                  <ErrorContext
                    value={{
                      deleteError,
                      handleDismiss,
                    }}>
                    <ErrorMessage />
                  </ErrorContext>
                )}
              </div>
            ))}
        </ul>
      </div>
    </>
  )
}

export default Tags
