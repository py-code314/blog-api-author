export function validateConfirmPasswordInput(
  confirmPassword,
  setValidFormData,
  setErrorMessages,
  password,
) {
  // Validate input
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
  } else if (trimmedConfirmPassword !== password.trim()) {
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
