/* -------------------- Styles -------------------- */
import styles from './EditTagForm.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect, useContext } from 'react'
import { useSubmitForm } from '../../../../hooks/useSubmitForm.js'
import { useNavigate } from 'react-router'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-1.svg'
/* -------------------- Components -------------------- */
import Button from '../../../core/Button/Button.jsx'

/* -------------------- Functions -------------------- */
import {
  validateNameInput,
  displayEmptyInputError,
  displayServerError,
} from '../../../../utils/category-tag/index.js'
/* -------------------- Context -------------------- */
import { TagContext } from '../../../../contexts/tag/TagContext.jsx'

const EditTagForm = ({ tagData }) => {
  const { setIsEdit } = useContext(TagContext)
  const nameRef = useRef(null)
  const navigate = useNavigate()

  const { tag } = tagData
  const { id, name: tagName } = tag

  const [fetchData, data] = useSubmitForm(
    `http://localhost:8080/api/v1/tags/${id}/update`,
  )

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (data?.success) {
      navigate(`/tags`)
    }
  }, [data, navigate])

  // State variables
  const [name, setName] = useState(tagName)
  const [validName, setValidName] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
    validateNameInput(name, setValidName, setErrorMsg)
  }

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
    // const isValid = true
    const isValid = validateForm()

    if (isValid) {
      const result = await fetchData({ name })
      // console.log('🚀 ~ handleFormSubmit ~ result:', result)

      if (result.success) {
        setName('')
        setValidName(null)
        setErrorMsg('')
        setIsEdit(false)
      } else if (!result.validData) {
        displayServerError(result.errors, setValidName, setErrorMsg)
      }
    }
  }

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

        {/* Save button */}
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

export default EditTagForm
