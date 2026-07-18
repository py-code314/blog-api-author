import styles from './SignupForm.module.css'
import { useRef, useEffect, useContext, useState } from 'react'
import { ModalContext } from '../../contexts/modal/ModalContext'
import Button from '../../components/core/Button/Button'
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'

const SignupForm = () => {
  const { isModalOpen, handleCloseModal } = useContext(ModalContext)
  const emailInputRef = useRef(null)
  // const isResettingRef = useRef(false)

  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      // Use setTimeout to make sure focus() runs after browser finishes drawing modal and input field
      setTimeout(() => {
        // Focus email input field upon modal is open
        emailInputRef.current.focus()
      }, 0)
    }
  }, [isModalOpen])

  // State variables
  const defaultSignupFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  const [signupFormData, setSignupFormData] = useState(defaultSignupFormData)

  const defaultErrorMessages = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages)

  const defaultValidFormData = {
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
  }
  const [validFormData, setValidFormData] = useState(defaultValidFormData)

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  // TODO: Reset form data to initial values when Esc key pressed or Close btn clicked

  // Handle input changes
  const handleEmailChange = (e) => {
    const email = e.target.value
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }))

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setValidFormData((prevValid) => ({ ...prevValid, email: false }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email address',
      }))
    } else if (!emailRegExp.test(trimmedEmail)) {
      setValidFormData((prevValid) => ({ ...prevValid, email: false }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address',
      }))
    } else {
      setValidFormData((prevValid) => ({ ...prevValid, email: true }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: '',
      }))
    }
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }))

    const trimmedPassword = password.trim()
    if (!trimmedPassword) {
      setValidFormData((prevValid) => ({ ...prevValid, password: false }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password',
      }))
    } else if (!passwordRegExp.test(trimmedPassword)) {
      setValidFormData((prevValid) => ({ ...prevValid, password: false }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a valid password',
      }))
    } else {
      setValidFormData((prevValid) => ({ ...prevValid, password: true }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: '',
      }))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      confirmPassword,
    }))

    const trimmedConfirmPassword = confirmPassword.trim()
    if (!trimmedConfirmPassword) {
      setValidFormData((prevValid) => ({
        ...prevValid,
        confirmPassword: false,
      }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Please re-enter your password',
      }))
    } else if (trimmedConfirmPassword !== signupFormData.password.trim()) {
      setValidFormData((prevValid) => ({
        ...prevValid,
        confirmPassword: false,
      }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }))
    } else {
      setValidFormData((prevValid) => ({ ...prevValid, confirmPassword: true }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }))
    }
  }

  const handleNameChange = (e) => {
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      name: e.target.value,
    }))
  }

  const validateForm = () => {
    if (!signupFormData.email.trim()) {
      setValidFormData((prevValid) => ({ ...prevValid, email: false }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email address',
      }))
    } else if (!signupFormData.password.trim()) {
      setValidFormData((prevValid) => ({ ...prevValid, password: false }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password',
      }))
    } else if (!signupFormData.confirmPassword.trim()) {
      setValidFormData((prevValid) => ({
        ...prevValid,
        confirmPassword: false,
      }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Please re-enter your password',
      }))
    }

    if (
      validFormData.email === true &&
      validFormData.password === true &&
      validFormData.confirmPassword === true
    ) {
      return true
    } else {
      return false
    }
  }

  // TODO: Clear form fields with Esc and Close button
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    const isValid = true
    // const isValid = validateForm()
    console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (isValid) {
      // TODO: useNavigate() to redirect to Login page after signup
      // console.log('signup form data:', signupFormData)

      try {
        const response = await fetch('http://localhost:8080/api/v1/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupFormData),
        })
        // console.log("🚀 ~ handleFormSubmit ~ response.ok:", response.ok)
        if (response.ok) {
          const data = await response.json()
          console.log(data)

          handleCloseModal()
          setIsFormSubmitted(false)
          setSignupFormData(defaultSignupFormData)
          setErrorMessages(defaultErrorMessages)
          setValidFormData(defaultValidFormData)
        } else {
          const errorData = await response.json()
          console.log(errorData)
          setIsFormSubmitted(false)

          const errors = errorData.errors
          console.log('🚀 ~ handleFormSubmit ~ errors:', errors)

          errors.forEach((error) => {
            if (error.path === 'email') {
              setValidFormData((prevValid) => ({ ...prevValid, email: false }))
              setErrorMessages((prevErrors) => ({
                ...prevErrors,
                email: error.msg,
              }))
            } else if (error.path === 'password') {
              setValidFormData((prevValid) => ({
                ...prevValid,
                password: false,
              }))
              setErrorMessages((prevErrors) => ({
                ...prevErrors,
                password: error.msg,
              }))
            } else if (error.path === 'confirmPassword') {
              setValidFormData((prevValid) => ({ ...prevValid, confirmPassword: false }))
              setErrorMessages((prevErrors) => ({
                ...prevErrors,
                confirmPassword: error.msg,
              }))
            } 
          })
        }
      } catch (error) {
        console.log('API Error:', error)
        // ? Should I show this error on the page
        setIsFormSubmitted(false)
      }
    } else {
      setIsFormSubmitted(false)
    }
  }

  return (
    <div className={styles.signup}>
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
              // onBlur={handleEmailValidation}
              ref={emailInputRef}
            />
            {validFormData.email && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkMarkIcon}
                alt=""
                width={25}
                height={25}
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
                className={styles.formErrorMessage}
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
          <p className={styles.passwordReq}>
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
              // onBlur={handlePasswordValidation}
            />
            {validFormData.password && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkMarkIcon}
                alt=""
                width={25}
                height={25}
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
                className={styles.formErrorMessage}
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
              // pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
              required
              value={signupFormData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              // onBlur={handleConfirmPasswordValidation}
            />
            {validFormData.confirmPassword && (
              <img
                className={styles.formCheckmark}
                aria-hidden="true"
                src={checkMarkIcon}
                alt=""
                width={25}
                height={25}
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
                className={styles.formErrorMessage}
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
            Name (optional)
          </label>

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Eric Cartman"
            className={styles.formInput}
            autoComplete="name"
            value={signupFormData.firstName}
            onChange={handleNameChange}
          />
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
