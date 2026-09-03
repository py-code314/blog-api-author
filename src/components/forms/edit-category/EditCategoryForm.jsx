/* -------------------- Styles -------------------- */
import styles from './EditCategoryForm.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useRef, useEffect } from 'react'
import { useSubmitForm } from '../../../hooks/useSubmitForm.js'
import { useNavigate } from 'react-router'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../../assets/icons/icon-check.svg'
import errorIcon from '../../../assets/icons/icon-error.svg'
/* -------------------- Components -------------------- */
import Button from '../../core/Button/Button.jsx'
/* -------------------- Functions -------------------- */
import { validateNameInput } from '../../../utils/category/index.js'

const EditCategoryForm = ({ categoryData }) => {
  // console.log("🚀 ~ EditCategoryForm ~ categoryData:", categoryData)
  const { category } = categoryData
  const { id, name: categoryName } = category
  const nameRef = useRef(null)
  const navigate = useNavigate()

  const [fetchData, status, data] = useSubmitForm(
    `http://localhost:8080/api/v1/categories/${id}/update`,
  )

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (data?.success) {
      navigate(`/categories`)
    }
  }, [data, navigate])

  // State variables
  const [name, setName] = useState(categoryName)
  const [validName, setValidName] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
    validateNameInput(name, setValidName, setErrorMsg)
  }

  // const validateForm = () => {
  //   displayEmptyInputErrors(name, setValidName, setErrorMsg)

  //   if (validName.title === true && validName.content === true) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault()
  //   // const isValid = true
  //   const isValid = validateForm()
  //   // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

  //   if (isValid) {
  //     const result = await fetchData(name)
  //     // console.log('🚀 ~ handleFormSubmit ~ result:', result)

  //     if (result.success) {
  //       setName({
  //         title: '',
  //         content: '',
  //         categories: [],
  //         tags: [],
  //         published: true,
  //       })
  //       setValidName(defaultValidFormData)
  //       setErrorMsg(defaultErrorMsgs)
  //     } else if (!result.validData) {
  //       displayServerErrors(result.errors, setValidName, setErrorMsg)
  //     }
  //   }
  // }
  const handleFormSubmit = () => {}

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
                width={40}
                height={40}
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
                width={25}
                height={25}
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
        <Button className="saveBtn" title="Save" type="submit">
          Save
        </Button>
      </form>
    </>
  )
}

export default EditCategoryForm
