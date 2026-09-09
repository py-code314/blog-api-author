/* -------------------- Styles -------------------- */
import styles from './EditCategoryForm.module.css'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-1.svg'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { useSubmitForm } from '../../../../hooks/useSubmitForm.js'
/* -------------------- Context -------------------- */
import { CategoryContext } from '../../../../contexts/category/CategoryContext.jsx'
/* -------------------- Components -------------------- */
import Button from '../../../core/Button/Button.jsx'
/* -------------------- Functions -------------------- */
import {
  validateNameInput,
  displayEmptyInputError,
  displayServerError,
} from '../../../../utils/category-tag/index.js'

/* Component to display 'edit category form' */
const EditCategoryForm = ({ categoryData }) => {
  const nameRef = useRef(null)
  const navigate = useNavigate()
  const { setIsEdit } = useContext(CategoryContext)

  // Destructure props
  const { category } = categoryData
  const { id, name: categoryName } = category

  // Get data and form submit function
  const [fetchData, data] = useSubmitForm(
    `http://localhost:8080/api/v1/categories/${id}/update`,
  )

  // State variables
  const [name, setName] = useState(categoryName)
  const [validName, setValidName] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Focus name input on page load
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  // Redirect to categories after successful edit
  useEffect(() => {
    if (data?.success) {
      navigate(`/categories`)
    }
  }, [data, navigate])

  // Name input handler
  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
    validateNameInput(name, setValidName, setErrorMsg)
  }

  // Form submission handlers
  const validateForm = () => {
    displayEmptyInputError(name, setValidName, setErrorMsg)

    if (validName === true) {
      return true
    } else {
      return false
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateForm()

    if (isValid) {
      const result = await fetchData({ name })

      if (result.success) {
        // Reset state if there are no errors
        setName('')
        setValidName(null)
        setErrorMsg('')
        setIsEdit(false)
      } else if (!result.validData) {
        displayServerError(result.errors, setValidName, setErrorMsg)
      }
    }
  }

  // Reset state if user cancels editing category
  const handleCancel = () => {
    setIsEdit(false)
    setName('')
    setValidName(null)
    setErrorMsg('')
  }

  return (
    <>
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Name */}
        <div className={styles.formControl}>
          <label htmlFor="name" className={styles.formLabel}>
            Name (required)
          </label>

          <div className={styles.formValid}>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.formInput}
              required
              value={name}
              onChange={handleNameChange}
              ref={nameRef}
            />
            {validName && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkMarkIcon}
                alt=""
                width={30}
                height={30}
              />
            )}
          </div>
          {validName === false && (
            <div className={styles.formError}>
              <img
                className={styles.formErrorIcon}
                aria-hidden="true"
                src={errorIcon}
                alt=""
                width={20}
                height={20}
              />
              <p
                className={styles.formErrorMsg}
                aria-live="polite"
                id="invalid-title">
                {errorMsg}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className={styles.btns}>
          <Button className="saveBtn" title="Save" type="submit">
            Save
          </Button>
          <Button className="cancelBtn" title="Cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditCategoryForm
