/* -------------------- Styles -------------------- */
import styles from './Categories.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData'
import { useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../components/core/Button/Button'
import ErrorMessage from '../../components/pages/homepage/error/ErrorMessage'
import EditCategory from '../edit-category/EditCategory'
import AddCategoryForm from '../../components/forms/add-category/AddCategoryForm'
/* -------------------- Icons -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'
/* -------------------- Context -------------------- */
import { ErrorContext } from '../../contexts/error/ErrorContext'
import { CategoryContext } from '../../contexts/category/CategoryContext'

const Categories = () => {
  // State variables
  // To add error msg
  const [deleteError, setDeleteError] = useState(null)
  // To display error msg or edit form only for that particular category
  const [categoryId, setCategoryId] = useState(null)
  // To display 'add new category form'
  const [isNew, setIsNew] = useState(false)
  // To display 'edit category form'
  const [isEdit, setIsEdit] = useState(false)
  // To re-render categories after deleting a category
  const [isDelete, setIsDelete] = useState(false)

  // Pass isEdit and isNew as arguments to run useData second time to get updated values of categories from db
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/categories/all',
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
      <div className={styles.categories}>
        <title>Scriblr | Categories</title>
        <h2 className={styles.subTitle}>Categories</h2>

        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon} alt="" width={70} height={70} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving categories. Please try again later.</p>
          </div>
        </div>
        <Link className={styles.homeLink} to={'/'}>
          <span className={styles.backIcon}>←</span>Back to Home
        </Link>
      </div>
    )

  const handleAddCategory = () => {
    setIsNew(true)
  }

  const handleDeleteCategory = async (id) => {
    // Author should be logged in to delete a category
    const authToken = localStorage.getItem('jwtToken')
    setDeleteError(null)
    setCategoryId(null)
    setIsDelete(false)

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/categories/${id}/delete`,
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
        setCategoryId(null)
      } else {
        // Show error msgs from server under that particular category
        setDeleteError({
          code: result.errorCode,
          title: result.errorTitle,
          msg: result.errorMessage,
        })
        setCategoryId(id)
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
      setCategoryId(id)
      setIsDelete(false)
    }
  }

  // Handle Dismiss button inside the error msg
  const handleDismiss = () => {
    setDeleteError(null)
    setCategoryId(null)
  }

  const handleEditCategory = (id) => {
    setIsEdit(true)
    setCategoryId(id)
  }

  return (
    <>
      <div className={styles.categories}>
        <title>Scriblr | Categories</title>
        <h2 className={styles.subTitle}>Categories</h2>

        {/* Add button */}
        <Button
          className="addBtn"
          title="Add category"
          onClick={handleAddCategory}>
          Add Category
        </Button>

        {/* Display 'add category form' conditionally */}
        {isNew && (
          <CategoryContext
            value={{
              setIsNew,
            }}>
            <AddCategoryForm />
          </CategoryContext>
        )}

        <ul className={styles.categoryList}>
          {data.categories.length > 0 &&
            data.categories.map((category) => (
              <div key={category.id} className={styles.categoryWrapper}>
                {/* Display 'edit category form' conditionally and only for that particular category  */}
                {isEdit && category.id === categoryId ? (
                  <CategoryContext
                    value={{
                      categoryId,
                      setIsEdit,
                    }}>
                    <EditCategory />
                  </CategoryContext>
                ) : (
                  <li className={styles.category}>
                    <p className={styles.name}>{category.name}</p>
                    <div className={styles.actionGroup}>
                      {/* Edit button */}
                      <Button
                        className="editBtn"
                        title="Edit category"
                        onClick={() => handleEditCategory(category.id)}>
                        Edit
                      </Button>
                      {/* Delete button */}
                      <Button
                        className="deleteBtn"
                        title="Delete category"
                        onClick={() => handleDeleteCategory(category.id)}>
                        Delete
                      </Button>
                    </div>
                  </li>
                )}

                {/* Show error msg if deleting a category fails. Display it conditionally and only under that particular category  */}
                {category.id === categoryId && deleteError && (
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

export default Categories
