import styles from './SignupForm.module.css'
import { useState } from 'react'
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'

const SignupForm = () => {
  const defaultSignupFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  }
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

  // const handleSignupFormSubmit = (data) => {
  //   setSignupFormData(data)
  //   handleCloseModal()
  // }

  // Handle input changes
  const handleEmailChange = (e) => {
    setSignupFormData({ ...signupFormData, email: e.target.value })
  }
  const handlePasswordChange = (e) => {
    setSignupFormData({ ...signupFormData, password: e.target.value })
  }
  const handleConfirmPasswordChange = (e) => {
    setSignupFormData({ ...signupFormData, confirmPassword: e.target.value })
  }
  const handleNameChange = (e) => {
    setSignupFormData({ ...signupFormData, name: e.target.value })
  }

  const handleEmailValidation = () => {
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    setBlurredInput({ ...blurredInput, email: true })
    if (!signupFormData.email) {
      setValidFormData({ ...validFormData, email: false })
      setErrorMessage({
        ...errorMessage,
        email: 'Please enter your email address',
      })
    } else if (!emailRegExp.test(signupFormData.email)) {
      setValidFormData({ ...validFormData, email: false })
      setErrorMessage({
        ...errorMessage,
        email: 'Please enter a valid email address',
      })
    } else {
      setValidFormData({ ...validFormData, email: true })
      setErrorMessage({
        ...errorMessage,
        email: '',
      })
    }
  }
  const handlePasswordValidation = () => {
    const emailRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    setBlurredInput({ ...blurredInput, password: true })
    if (!signupFormData.password) {
      setValidFormData({ ...validFormData, password: false })
      setErrorMessage({
        ...errorMessage,
        password: 'Please enter your password',
      })
    } else if (!emailRegExp.test(signupFormData.password)) {
      setValidFormData({ ...validFormData, password: false })
      setErrorMessage({
        ...errorMessage,
        password: 'Please enter a valid password',
      })
    } else {
      setValidFormData({ ...validFormData, password: true })
      setErrorMessage({
        ...errorMessage,
        password: '',
      })
    }
  }
  const handleConfirmPasswordValidation = () => {
    setBlurredInput({ ...blurredInput, confirmPassword: true })
    if (!signupFormData.confirmPassword) {
      setValidFormData({ ...validFormData, confirmPassword: false })
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Please re-enter your password',
      })
    } else if (signupFormData.password !== signupFormData.confirmPassword) {
      setValidFormData({ ...validFormData, confirmPassword: false })
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Passwords do not match',
      })
    } else {
      setValidFormData({ ...validFormData, confirmPassword: true })
      setErrorMessage({
        ...errorMessage,
        confirmPassword: '',
      })
    }
  }

  return (
    <div className={styles.signup}>
      {/* Sign-up form */}
      <form
        className={styles.form}
        noValidate
        // onSubmit={handleFormValidation}
      >
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
        <button className={styles.btn} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
