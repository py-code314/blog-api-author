export function displayLoginServerErrors(data, setValidFormData, setErrorMsgs) {
  data.errors.forEach((error) => {
    if (error.path === 'email') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        email: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        email: error.msg,
      }))
    } else if (error.path === 'password') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        password: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        password: error.msg,
      }))
    }
  })
  
}