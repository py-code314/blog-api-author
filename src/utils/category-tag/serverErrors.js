/* Function to display form errors coming from server */
export function displayServerFormErrors(errors, setValidName, setErrorMsg) {
  errors.forEach((error) => {
    if (error.path === 'name') {
      setValidName(false)
      setErrorMsg(error.msg)
    }
  })
}

/* Function display other backend errors */
export function displayServerError(errorMsg, setValidName, setErrorMsg) {
  setValidName(false)
  setErrorMsg(errorMsg)
}
