/* -------------------- Styles -------------------- */
import styles from './EditTagForm.module.css'
/* -------------------- Icons -------------------- */
import checkMarkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-1.svg'
import saveIcon from '../../../../assets/icons/icon-save.svg'
import cancelIcon from '../../../../assets/icons/icon-cancel.svg'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect, useContext } from 'react'
import { useSubmitForm } from '../../../../hooks/useSubmitForm.js'
import { useNavigate } from 'react-router'
/* -------------------- Context -------------------- */
import { TagContext } from '../../../../contexts/tag/TagContext.jsx'
/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button.jsx'
/* -------------------- Functions -------------------- */
import {
  validateNameInput,
  displayEmptyInputError,
  displayServerError,
} from '../../../../utils/category-tag/index.js'

/* Component to display 'edit tag form' */
const EditTagForm = ({ tagData }) => {
  const nameRef = useRef(null)
  const navigate = useNavigate()
  const { setIsEdit } = useContext(TagContext)

  // Destructure props
  const { tag } = tagData
  const { id, name: tagName } = tag

  const [fetchData, data] = useSubmitForm(
    `http://localhost:8080/api/v1/tags/${id}/update`,
  )

  // State variables
  const [name, setName] = useState(tagName)
  const [validName, setValidName] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Focus form after page load
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  // Redirect to tags page after successful submission
  useEffect(() => {
    if (data?.success) {
      navigate(`/tags`)
    }
  }, [data, navigate])

  // Handler for name input
  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
    validateNameInput(name, setValidName, setErrorMsg)
  }

  // Handlers to validate and submit form
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
        setIsEdit(false)
      } else if (!result.validData) {
        displayServerError(result.errors, setValidName, setErrorMsg)
      }
    }
  }

  // Reset state if user cancels editing
  const handleCancel = () => {
    setIsEdit(false)
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
            <img src={saveIcon} alt="" width={20} height={20} />
            Save
          </Button>
          <Button className="cancelBtn" title="Cancel" onClick={handleCancel}>
            <img src={cancelIcon} alt="" width={20} height={20} />
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditTagForm
