import styles from './SignupForm.module.css'
// import { useState } from 'react'
import { useRef, useEffect, useContext, useState } from 'react'
import { ModalContext } from '../../contexts/modal/ModalContext'
import Button from '../../components/core/Button/Button'
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'

const SignupForm = () => {
  const { isModalOpen, handleCloseModal } = useContext(ModalContext)
  const emailInputRef = useRef(null)


  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      // Use setTimeout to make sure focus() runs after browser finishes drawing modal and input field
      setTimeout(() => {
        // Focus email input field upon modal is open
        emailInputRef.current.focus()
      }, 0)
    }
  }, [isModalOpen])

  const defaultSignupFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
  // State variables
  const [signupFormData, setSignupFormData] = useState(defaultSignupFormData)
  const [blurredInput, setBlurredInput] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
  })
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  })
  const [validFormData, setValidFormData] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
  })
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
    /* If this code is placed in email validation function, it's 
    causing re-render of the form because of 'blur' event and the 
    re-render is blocking 'submit' event eventually. Place this code
    here to prevent that */
    // Update state when email matches the regex
    if (emailRegExp.test(email.trim())) {
      setValidFormData((prevValid) => ({ ...prevValid, email: true }))
      setErrorMessage((prevErrors) => ({
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
    // Update state when email matches the regex
    if (passwordRegExp.test(password.trim())) {
      setValidFormData((prevValid) => ({ ...prevValid, password: true }))
      setErrorMessage((prevErrors) => ({
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

    // Show check mark if the value is correct
    if (confirmPassword === signupFormData.password) {
      setValidFormData((prevFormData) => ({
        ...prevFormData,
        confirmPassword: true,
      }))
      setErrorMessage({
        ...errorMessage,
        confirmPassword: '',
      })
    }
  }

  const handleNameChange = (e) => {
    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      name: e.target.value,
    }))
    setBlurredInput((prevBlurred) => ({
      ...prevBlurred,
      name: false,
    }))
  }

  const handleEmailValidation = () => {
    const email = signupFormData.email.trim()
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    setBlurredInput({ ...blurredInput, email: true })

    if (!email) {
      setValidFormData({ ...validFormData, email: false })
      setErrorMessage({
        ...errorMessage,
        email: 'Please enter your email address',
      })
    } else if (!emailRegExp.test(email)) {
      setValidFormData({ ...validFormData, email: false })
      setErrorMessage({
        ...errorMessage,
        email: 'Please enter a valid email address',
      })
    }
  }

  const handlePasswordValidation = () => {
    const password = signupFormData.password.trim()
    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    setBlurredInput({ ...blurredInput, password: true })

    if (!password) {
      setValidFormData({ ...validFormData, password: false })
      setErrorMessage({
        ...errorMessage,
        password: 'Please enter your password',
      })
    } else if (!passwordRegExp.test(password)) {
      setValidFormData({ ...validFormData, password: false })
      setErrorMessage({
        ...errorMessage,
        password: 'Please enter a valid password',
      })
    }
  }

  const handleConfirmPasswordValidation = () => {
    const password = signupFormData.password.trim()
    const confirmPassword = signupFormData.confirmPassword.trim()

    setBlurredInput({ ...blurredInput, confirmPassword: true })

    if (!confirmPassword) {
      setValidFormData({ ...validFormData, confirmPassword: false })
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Please re-enter your password',
      })
    } else if (password !== confirmPassword) {
      setValidFormData({ ...validFormData, confirmPassword: false })
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Passwords do not match',
      })
    }
  }

  const validateForm = () => {
    // Regex for email and password
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    const passwordRegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    // Use '!!' to strictly return a boolean true or false
    const isEmailValid =
      !!signupFormData.email && emailRegExp.test(signupFormData.email)
    const isPasswordValid =
      !!signupFormData.password && passwordRegExp.test(signupFormData.password)
    const isConfirmPasswordValid =
      !!signupFormData.confirmPassword &&
      signupFormData.password === signupFormData.confirmPassword

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
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
    const isValid = validateForm()
    // console.log("🚀 ~ handleFormSubmit ~ isValid:", isValid)

    // Validate input fields first
    if (isValid) {
      // Submit form

      // TODO: Send signupFormData to server in post request
      // TODO: Clear form fields after submission
      // TODO: useNavigate() to redirect to Login page after signup
      console.log('signup form data:', signupFormData)

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
        }
      } catch (error) {
        console.log('API Error:', error)
        setIsFormSubmitted(false)
      }
    } else {
      // handleConfirmPasswordValidation()
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
              value={signupFormData.firstName}
              onChange={handleEmailChange}
              onBlur={handleEmailValidation}
              ref={emailInputRef}
            />
            {validFormData.email && blurredInput.email && (
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
          {!validFormData.email && blurredInput.email && (
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
                {errorMessage.email}
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
              onBlur={handlePasswordValidation}
            />
            {validFormData.password && blurredInput.password && (
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
          {!validFormData.password && blurredInput.password && (
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
                {errorMessage.password}
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
              onBlur={handleConfirmPasswordValidation}
            />
            {validFormData.confirmPassword && blurredInput.confirmPassword && (
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
          {!validFormData.confirmPassword && blurredInput.confirmPassword && (
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
                {errorMessage.confirmPassword}
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
