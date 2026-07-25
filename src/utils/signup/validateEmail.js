export function validateEmailInput(
  email,
  setValidFormData,
  setErrorMessages,
  emailRegExp,
) {
  // Validate input
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