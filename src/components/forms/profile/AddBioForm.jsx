/* -------------------- Styles -------------------- */
import styles from './AddBioForm.module.css'
/* -------------------- Icons -------------------- */
// import checkMarkIcon from '../../../assets/icons/icon-check.svg'
import errorIcon from '../../../assets/icons/icon-error-1.svg'
import saveIcon from '../../../assets/icons/icon-save.svg'
import cancelIcon from '../../../assets/icons/icon-cancel.svg'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSubmitForm } from '../../../hooks/useSubmitForm.js'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button.jsx'
/* -------------------- Functions -------------------- */
import {
  validateBioInput,
  displayEmptyInputError,
  displayServerError,
} from '../../../utils/profile/index.js'

/* Component to display 'add bio form'  */
const AddBioForm = ({ setIsBio }) => {
  const bioRef = useRef(null)
  const navigate = useNavigate()

  // Get data and submit function from the hook
  const [fetchData, data] = useSubmitForm(
    `http://localhost:8080/api/v1/profiles/new`,
  )

  // State variables
  const [bio, setBio] = useState('')
  const [validBio, setValidBio] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Focus input on page load
  useEffect(() => {
    if (bioRef.current) {
      bioRef.current.focus()
    }
  }, [])

  // Redirect to categories after successful submission
  useEffect(() => {
    if (data?.success) {
      navigate(`/`)
    }
  }, [data, navigate])

  // Input handler function
  const handleBioChange = (e) => {
    const bio = e.target.value
    setBio(bio)
    validateBioInput(bio, setValidBio, setErrorMsg)
  }

  // Form submission handler functions
  const validateForm = () => {
    displayEmptyInputError(bio, setValidBio, setErrorMsg)

    if (validBio === true) {
      return true
    } else {
      return false
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateForm()

    if (isValid) {
      const result = await fetchData({ bio })

      if (result.success) {
        // Reset state if there are no errors
        setIsBio(false)
        setBio('')
        setValidBio(null)
        setErrorMsg('')
      } else if (!result.validData) {
        displayServerError(result.errors, setValidBio, setErrorMsg)
      }
    }
  }

  // Reset state if user cancels adding a new category
  const handleCancel = () => {
    setIsBio(false)
    setBio('')
    setValidBio(null)
    setErrorMsg('')
  }

  return (
    <>
      <form
        className={styles.form}
        noValidate
        onSubmit={handleFormSubmit}
      >
        {/* Bio  */}
        <div className={styles.formControl}>
          <div className={styles.formValid}>
            <textarea
              className={styles.formInput}
              name="bio"
              rows="5"
              cols="30"
              placeholder="Add bio..."
              value={bio}
              onChange={handleBioChange}
              ref={bioRef}></textarea>
          </div>

          {/* Error message  */}
          {validBio === false && (
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

export default AddBioForm
