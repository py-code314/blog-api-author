/* -------------------- Styles -------------------- */
import styles from './EditTag.module.css'
/* -------------------- Hooks -------------------- */
import { useData } from '../../hooks/useData.js'
import { useContext } from 'react'
/* -------------------- Components -------------------- */
import Button from '../../components/core/Button/Button.jsx'
import EditTagForm from '../../components/forms/tag/edit-tag/EditTagForm'
/* -------------------- Images -------------------- */
import errorIcon3 from '../../assets/icons/icon-error-3.svg'
/* -------------------- Context -------------------- */
import { TagContext } from '../../contexts/tag/TagContext.jsx'

const EditTag = () => {
  const { tagId, setIsEdit } = useContext(TagContext)

  // Get a single tag
  const { data, isLoading, error } = useData(
    `http://localhost:8080/api/v1/tags/${tagId}`,
  )

  const handleEdit = () => {
    setIsEdit(false)
  }

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.editTag}>
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
            <p>Error retrieving tag. Please try again.</p>
          </div>
        </div>
        {/* Back button */}
        <Button
          className="backBtn"
          title="Back to Tag"
          onClick={handleEdit}>
          <span>⬅</span>Back
        </Button>
      </div>
    )

  return (
    <>
      <div className={styles.editTag}>
        <EditTagForm tagData={data} />
      </div>
    </>
  )
}

export default EditTag
