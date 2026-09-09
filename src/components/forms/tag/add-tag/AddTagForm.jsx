/* -------------------- Styles -------------------- */
import styles from './AddTagForm.module.css'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-1.svg'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect, useContext } from 'react'
import { useSubmitForm } from '../../../../hooks/useSubmitForm.js'
import { useNavigate } from 'react-router'
/* -------------------- Context -------------------- */
import { TagContext } from '../../../../contexts/tag/TagContext'
/* -------------------- Components -------------------- */
import Button from '../../../core/Button/Button.jsx'
/* -------------------- Functions -------------------- */
import {
  validateNameInput,
  displayEmptyInputError,
  displayServerError,
} from '../../../../utils/category-tag/index.js'

/* Component to display 'add tag form' */
const AddTagForm = () => {
  const nameRef = useRef(null)
  const navigate = useNavigate()
  const { setIsNew } = useContext(TagContext)

  // Get data and form submit function from custom hook
  const [fetchData, data] = useSubmitForm(
    `http://localhost:8080/api/v1/tags/new`,
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

  // Redirect to tags after successful submission
  useEffect(() => {
    if (data?.success) {
      navigate(`/tags`)
    }
  }, [data, navigate])

  // Handler for tag name
  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
    validateNameInput(name, setValidName, setErrorMsg)
  }

  // Handlers for validating and submitting the form
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
        // Reset state after successful submission
        setName('')
        setValidName(null)
        setErrorMsg('')
        setIsNew(false)
      } else if (!result.validData) {
        displayServerError(result.errors, setValidName, setErrorMsg)
      }
    }
  }

  // Reset state if user cancels adding a new tag
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
            {/* Valid input  */}
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
                id="invalid-name">
                {errorMsg}
              </p>
            </div>
          )}
        </div>

        {/* Buttons  */}
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

export default AddTagForm
