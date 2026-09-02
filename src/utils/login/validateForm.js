export function validateForm(
  loginFormData,
  validFormData,
  setValidFormData,
  setErrorMsgs,
) {
  // TODO: Move this code into a separate function
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
