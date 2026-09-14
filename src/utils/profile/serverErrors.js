/* Function to display errors coming from server */
export function displayServerError(errors, setValidBio, setErrorMsg) {
  errors.forEach((error) => {
    if (error.path === 'bio') {
      setValidBio(false)
      setErrorMsg(error.msg)
    }
  })
}
