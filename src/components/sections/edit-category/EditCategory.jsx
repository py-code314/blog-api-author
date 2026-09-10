/* -------------------- Styles -------------------- */
import styles from './EditCategory.module.css'
/* -------------------- Images -------------------- */
import errorIcon3 from '../../../assets/icons/icon-error-3.svg'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
import { useData } from '../../../hooks/useData.js'
/* -------------------- Context -------------------- */
import { CategoryContext } from '../../../contexts/category/CategoryContext.jsx'
/* -------------------- Components -------------------- */
import Button from '../../../components/core/button/Button.jsx'
import EditCategoryForm from '../../../components/forms/category/edit-category/EditCategoryForm.jsx'

/* Component to get a single category data */
const EditCategory = () => {
  const { categoryId, setIsEdit } = useContext(CategoryContext)

  // Get data for a single category
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/categories/${categoryId}`,
  )

  // Handler function
  const handleBackBtn = () => {
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
          onClick={handleBackBtn}>
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
