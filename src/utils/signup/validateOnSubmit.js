/* Function to check for empty inputs on form submission */
export function displayEmptyInputErrors(
  signupFormData,
  setValidFormData,
  setErrorMessages,
) {
  // Update state if input fields are empty
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
}
