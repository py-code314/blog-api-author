export function validatePasswordInput(
  password,
  setValidFormData,
  setErrorMessages,
  passwordRegExp,
) {
  // Validate input
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
