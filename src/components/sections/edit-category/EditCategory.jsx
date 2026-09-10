/* -------------------- Styles -------------------- */
import styles from './EditCategory.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../../hooks/useData.js'
import { useContext } from 'react'
/* -------------------- Components -------------------- */
import Button from '../../../components/core/Button/Button.jsx'
import EditCategoryForm from '../../../components/forms/category/edit-category/EditCategoryForm.jsx'
/* -------------------- Images -------------------- */
import errorIcon3 from '../../../assets/icons/icon-error-3.svg'
/* -------------------- Context -------------------- */
import { CategoryContext } from '../../../contexts/category/CategoryContext.jsx'

const EditCategory = () => {
  const { categoryId, setIsEdit } = useContext(CategoryContext)

  // Get a single category
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/categories/${categoryId}`,
  )

  const handleEdit = () => {
    setIsEdit(false)
  }

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.editCategory}>
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}></div>
        </div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.error}>
        <div className={styles.errorWrapper}>
          <div className={styles.errorImage}>
            <img src={errorIcon3} alt="" width={30} height={30} />
          </div>

          <div className={styles.errorContent}>
            <p>Error retrieving category. Please try again.</p>
          </div>
        </div>
        {/* Back button */}
        <Button
          className="backBtn"
          title="Back to category"
          onClick={handleEdit}>
          <span>⬅</span>Back
        </Button>
      </div>
    )

  return (
    <>
      <div className={styles.editCategory}>
        <EditCategoryForm categoryData={data} />
      </div>
    </>
  )
}

export default EditCategory
