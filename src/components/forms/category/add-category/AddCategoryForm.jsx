/* -------------------- Styles -------------------- */
import styles from './AddCategoryForm.module.css'
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

/* Component to display 'add category form'  */
const AddCategoryForm = () => {
  const nameRef = useRef(null)
  const navigate = useNavigate()
  const { setIsNew } = useContext(CategoryContext)

  // Get data and submit function from the hook
  const [fetchData, data] = useSubmitForm(
    `http://localhost:8080/api/v1/categories/new`,
  )

  // State variables
  const [name, setName] = useState('')
  const [validName, setValidName] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Focus input on page load
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  // Redirect to categories after successful submission
  useEffect(() => {
    if (data?.success) {
      navigate(`/categories`)
    }
  }, [data, navigate])

  // Input handler function
  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
    validateNameInput(name, setValidName, setErrorMsg)
  }

  // Form submission handler functions
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
        setIsNew(false)
      } else if (!result.validData) {
        displayServerError(result.errors, setValidName, setErrorMsg)
      }
    }
  }

  // Reset state if user cancels adding a new category
  const handleCancel = () => {
    setIsNew(false)
    setName('')
    setValidName(null)
    setErrorMsg('')
  }

  return (
    <>
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Name  */}
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
            {/* Show checkmark if input is valid */}
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

          {/* Error message  */}
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
            Submit
          </Button>

          <Button className="cancelBtn" title="Cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default AddCategoryForm
