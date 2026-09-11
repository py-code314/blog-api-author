/* Function to display errors coming from server */
export function displayServerError(errors, setValidName, setErrorMsg) {
  errors.forEach((error) => {
    if (error.path === 'name') {
      setValidName(false)
      setErrorMsg(error.msg)
    }
  })
}
