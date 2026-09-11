/* Function to display server errors for invalid new post form data */
export function displayServerErrors(errors, setValidFormData, setErrorMsgs) {
  errors.forEach((error) => {
    if (error.path === 'title') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        title: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        title: error.msg,
      }))
    } else if (error.path === 'content') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        content: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        content: error.msg,
      }))
    } else if (error.path === 'categories') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        categories: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        categories: error.msg,
      }))
    } else if (error.path === 'tags') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        tags: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        tags: error.msg,
      }))
    } else if (error.path === 'published') {
      setValidFormData((prevValid) => ({
        ...prevValid,
        published: false,
      }))
      setErrorMsgs((prevErrors) => ({
        ...prevErrors,
        published: error.msg,
      }))
    }
  })
}
