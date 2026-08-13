export function displaySignupServerErrors(errors, setValidFormData, setErrorMessages) {
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
      setValidFormData((prevValid) => ({
        ...prevValid,
        confirmPassword: false,
      }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: error.msg,
      }))
    } else if (error.path === 'name') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        name: false,
      }))
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        name: error.msg,
      }))
    }
  })
}
