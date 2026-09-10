/* -------------------- Styles -------------------- */
import styles from './SignupForm.module.css'
/* -------------------- Images -------------------- */
import checkMarkIcon from '../../../../assets/icons/icon-check.svg'
import errorIcon from '../../../../assets/icons/icon-error-1.svg'
/* -------------------- Hooks -------------------- */
import { useRef, useEffect, useContext, useState } from 'react'
/* -------------------- Context -------------------- */
import { AuthContext } from '../../../../contexts/auth/AuthContext.jsx'
import { SignupModalContext } from '../../../../contexts/signup-modal/SignupModalContext'
/* -------------------- Components -------------------- */
import Button from '../../../core/button/Button'
/* -------------------- Functions -------------------- */
import {
  validateEmailInput,
  validatePasswordInput,
  validateConfirmPasswordInput,
  validateNameInput,
  displayEmptyInputErrors,
  registerUser,
  displaySignupServerErrors,
} from '../../../../utils/signup/index.js'

const SignupForm = () => {
  const emailInputRef = useRef(null)
  const { activeModal, setActiveModal } = useContext(AuthContext)
  const {
    handleSignupClose,
    signupFormData,
    setSignupFormData,
    validFormData,
    setValidFormData,
    signupErrorMsg,
    setSignupErrorMsg,
  } = useContext(SignupModalContext)

  // State variables
  const defaultErrorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const isModalOpen = activeModal === 'signup'

  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      /* Use setTimeout to make sure focus() runs after browser
       finishes drawing modal and input field */
      setTimeout(() => {
        // Focus email input field upon modal is open
        emailInputRef.current.focus()
      }, 0)
    }

    // Dynamically change page title
    if (isModalOpen) {
      document.title = 'Scriblr | Sign-up'
    } else {
      document.title = 'Scriblr'
    }
  }, [isModalOpen])

  // Handle form fields
  const handleEmailChange = (e) => {
    const email = e.target.value
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }))

    validateEmailInput(email, setValidFormData, setErrorMessages, emailRegExp)
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }))

    validatePasswordInput(
      password,
      setValidFormData,
      setErrorMessages,
      passwordRegExp,
    )
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value
    const password = signupFormData.password
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      confirmPassword,
    }))

    validateConfirmPasswordInput(
      confirmPassword,
      setValidFormData,
      setErrorMessages,
      password,
    )
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      name,
    }))

    validateNameInput(name, setValidFormData, setErrorMessages)
  }

  const validateForm = () => {
    displayEmptyInputErrors(signupFormData, setValidFormData, setErrorMessages)

    if (
      validFormData.email === true &&
      validFormData.password === true &&
      validFormData.confirmPassword === true &&
      validFormData.name !== false
    ) {
      return true
    } else {
      return false
    }
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    setSignupErrorMsg('')

    const isValid = validateForm()

    if (isValid) {
      try {
        // Send sign-up data to server
        const response = await registerUser(signupFormData)

        // Successful submission
        if (response.ok) {
          const data = await response.json()

          if (data.success) {
            // Reset state
            handleSignupClose()
            setIsFormSubmitted(false)
            setErrorMessages(defaultErrorMessages)
            setActiveModal('login')
          }
        } else {
          setIsFormSubmitted(false)
          const { errors } = await response.json()

          // Show server-side validation fail error messages
          displaySignupServerErrors(errors, setValidFormData, setErrorMessages)
        }
      } catch (error) {
        console.error('Signup Error:', error)
        setIsFormSubmitted(false)

        if (error.name === 'TypeError') {
          setSignupErrorMsg(
            'Network error. Please check your connection and try again.',
          )
        } else {
          setSignupErrorMsg('An unexpected error occurred. Please try again.')
        }
      }
    } else {
      setIsFormSubmitted(false)
    }
  }

  return (
    <div className={styles.signup}>
      {/* Display server and network errors  */}
      {signupErrorMsg && (
        <p className={styles.signupError} aria-live="polite" id="signup-error">
          {signupErrorMsg}
        </p>
      )}
      {/* Sign-up form */}
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Email input */}
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>
            Email (required)
          </label>
          <p className={styles.formHint} id="email-hint">
            Eg. hello.taylor@example.com
          </p>

          <div className={styles.formValid}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ericcartman@gmail.com"
              className={styles.formInput}
              autoComplete="email"
              inputMode="email"
              required
              value={signupFormData.email}
              onChange={handleEmailChange}
              ref={emailInputRef}
            />
            {validFormData.email && (
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
          {validFormData.email === false && (
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
                id="invalid-email">
                {errorMessages.email}
              </p>
            </div>
          )}
        </div>

        {/* Password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            Password (required)
          </label>
          <p className={styles.formHint}>
            Requires at least 8 characters, one lowercase letter (a - z), one
            uppercase letter (A - Z), one number (0 - 9), and one special
            character (!@#$%^&amp;*)
          </p>
          <div className={styles.formValid}>
            <input
              className={styles.formInput}
              id="password"
              name="password"
              type="password"
              min={8}
              placeholder="South^Park97"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
              required
              value={signupFormData.password}
              onChange={handlePasswordChange}
            />
            {validFormData.password && (
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
          {validFormData.password === false && (
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
                id="invalid-password">
                {errorMessages.password}
              </p>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="confirmPassword">
            Confirm Password (required)
          </label>
          <div className={styles.formValid}>
            <input
              className={styles.formInput}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              min={8}
              placeholder="South^Park97"
              required
              value={signupFormData.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {validFormData.confirmPassword && (
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
          {validFormData.confirmPassword === false && (
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
                id="invalid-confirmPassword">
                {errorMessages.confirmPassword}
              </p>
            </div>
          )}
        </div>

        {/* Name input */}
        <div className={styles.formControl}>
          <label htmlFor="name" className={styles.formLabel}>
            Full Name (optional)
          </label>

          <div className={styles.formValid}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Eric Cartman"
              className={styles.formInput}
              autoComplete="name"
              value={signupFormData.name}
              onChange={handleNameChange}
            />
            {validFormData.name && (
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
          {validFormData.name === false && (
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
                id="invalid-name">
                {errorMessages.name}
              </p>
            </div>
          )}
        </div>

        {/* Sign up button */}
        <Button
          className="btnSignup"
          title="Signup"
          type="submit"
          disabled={isFormSubmitted}>
          {isFormSubmitted ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}

export default SignupForm
