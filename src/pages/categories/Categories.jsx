/* -------------------- Styles -------------------- */
import styles from './Categories.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData'
import { useNavigate } from 'react-router'
import { useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../components/core/Button/Button'
import ErrorMessage from '../../components/pages/homepage/error/ErrorMessage'
import EditCategory from '../edit-category/EditCategory'
/* -------------------- Icons -------------------- */
import errorIcon from '../../assets/icons/icon-error-2.svg'
/* -------------------- Context -------------------- */
import { ErrorContext } from '../../contexts/error/ErrorContext'
import { CategoryContext } from '../../contexts/category/CategoryContext'

const Categories = () => {
  const navigate = useNavigate()

  const [deleteError, setDeleteError] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  // Pass isEdit as argument to run useData second time to get updated values of category names
  const { data, isLoading, error } = useData(
    'http://localhost:8080/api/v1/categories/all',
    { isEdit },
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

  const handleDeleteCategory = async (id) => {
    const authToken = localStorage.getItem('jwtToken')
    setDeleteError(null)

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
        navigate('/categories')
      } else {
        setDeleteError({
          code: result.errorCode,
          title: result.errorTitle,
          msg: result.errorMessage,
        })
        setCategoryId(id)
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

        {/* // TODO: Display add form in place */}
        <Link className={styles.addLink} to={'/new-category'}>
          <span className={styles.plusIcon}>+</span> Add Category
        </Link>

        <ul className={styles.categoryList}>
          {data.categories.length > 0 &&
            data.categories.map((category) => (
              <div key={category.id} className={styles.categoryWrapper}>
                {isEdit && category.id === categoryId ? (
                  <CategoryContext
                    value={{
                      categoryId,
                      setIsEdit,
                    }}>
                    <EditCategory />
                  </CategoryContext>
                ) : (
                  // <EditCategory categoryId={categoryId} setIsEdit={setIsEdit} />
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
