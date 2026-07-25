import styles from './LoginForm.module.css'
import { useRef, useEffect, useContext, useState } from 'react'
import { ModalContext } from '../../contexts/modal/ModalContext'
import { LoginFormContext } from '../../contexts/login-form/LoginFormContext'
import { AuthModalContext } from '../../contexts/auth-modal/AuthModalContext'
import Button from '../../components/core/Button/Button'
import checkMarkIcon from '../../assets/icons/icon-check.svg'
import errorIcon from '../../assets/icons/icon-error.svg'
import {
  loginUser,
  displayServerErrors,
  displayAuthErrors,
} from '../../utils/login/index'


const LoginForm = () => {
  const { isModalOpen, setIsLoggedIn } = useContext(ModalContext)
  const emailInputRef = useRef(null)
  const {
    defaultLoginFormData,
    loginFormData,
    setLoginFormData,
    validFormData,
    setValidFormData,
    loginErrorMsg,
    setLoginErrorMsg,
  } = useContext(LoginFormContext)
  const { handleClose } = useContext(AuthModalContext)

  // State variables
  const defaultErrorMsgs = {
    email: '',
    password: '',
  }
  const [errorMsgs, setErrorMsgs] = useState(defaultErrorMsgs)

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      // Use setTimeout to make sure focus() runs after browser finishes drawing modal and input field
      setTimeout(() => {
        // Focus email input field upon modal is open
        emailInputRef.current.focus()
      }, 0)
    }

    // Dynamically change page title
    if (isModalOpen) {
      document.title = 'Scriblr | Log-in'
    } else {
      document.title = 'Scriblr'
    }
  }, [isModalOpen])

  // Handle input changes
  const handleEmailChange = (e) => {
    const email = e.target.value
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }))

    // Validate input
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setValidFormData((prevValid) => ({ ...prevValid, email: false }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email address',
      }))
    } else if (!emailRegExp.test(trimmedEmail)) {
      setValidFormData((prevValid) => ({ ...prevValid, email: false }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address',
      }))
    } else {
      setValidFormData((prevValid) => ({ ...prevValid, email: true }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        email: '',
      }))
    }
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value

    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }))

    // Validate input
    const trimmedPassword = password.trim()
    if (!trimmedPassword) {
      setValidFormData((prevValid) => ({ ...prevValid, password: false }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password',
      }))
    } else if (trimmedPassword.length < 8) {
      setValidFormData((prevValid) => ({ ...prevValid, password: false }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters in length.',
      }))
    } else {
      setValidFormData((prevValid) => ({ ...prevValid, password: true }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        password: '',
      }))
    }
  }

  const validateForm = () => {
    // Update state if input fields are empty
    if (!loginFormData.email.trim()) {
      setValidFormData((prevValid) => ({ ...prevValid, email: false }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email address',
      }))
    } else if (!loginFormData.password.trim()) {
      setValidFormData((prevValid) => ({ ...prevValid, password: false }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter a password',
      }))
    }

    return !!validFormData.email && !!validFormData.password
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    setLoginErrorMsg('')
    // const isValid = true
    const isValid = validateForm()
    // console.log('🚀 ~ handleFormSubmit ~ isValid:', isValid)

    if (isValid) {
      // TODO: useNavigate() to redirect to homepage

      try {
        // Send log-in data to server
        const response = await loginUser(loginFormData)
        // console.log('🚀 ~ handleFormSubmit ~ response:', response)

        // Successful submission
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          // Store JWT
          if (data.success) {
            localStorage.setItem('jwtToken', data.token)
          }

          // ? Move these into above if condition
          // Reset state
          handleClose()
          setIsFormSubmitted(false)
          setLoginFormData(defaultLoginFormData)
          setErrorMsgs(defaultErrorMsgs)
          setIsLoggedIn(true)
        } else {
          setIsFormSubmitted(false)
          const data = await response.json()
          console.log('🚀 ~ handleFormSubmit ~ data:', data)

          // Show server-side validation fail error messages
          {
            data.validData === false &&
              (await displayServerErrors(data, setValidFormData, setErrorMsgs))
          }
          // Show auth fail error messages
          {
            data.auth === false &&
              (await displayAuthErrors(data, setValidFormData, setErrorMsgs))
          }
          // Display JWT error message
          {
            data.jwt === false &&
              setLoginErrorMsg(
                'Something went wrong on our end. Please try signing in again. ',
              )
          }
        }
      } catch (error) {
        console.error('Login Error:', error)
        setIsFormSubmitted(false)

        if (error.name === 'TypeError') {
          setLoginErrorMsg(
            'Network error. Please check your connection and try again.',
          )
        } else {
          setLoginErrorMsg('An unexpected error occurred. Please try again.')
        }
      }
    } else {
      setIsFormSubmitted(false)
    }
  }

  return (
    <div className={styles.login}>
      {loginErrorMsg && (
        <p className={styles.loginError} aria-live="polite" id="login-error">
          {loginErrorMsg}
        </p>
      )}
      {/* Log-in form */}
      <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
        {/* Email input */}
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>
            Email (required)
          </label>

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
              value={loginFormData.email}
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
                {errorMsgs.email}
              </p>
            </div>
          )}
        </div>

        {/* Password */}
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            Password (required)
          </label>

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
              value={loginFormData.password}
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
                {errorMsgs.password}
              </p>
            </div>
          )}
        </div>

        {/* Log-in button */}
        <Button
          className="btnLogin"
          title="Login"
          type="submit"
          disabled={isFormSubmitted}>
          {isFormSubmitted ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
