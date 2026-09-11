/* Function to validate new post title */
export function validateTitleInput(title, setValidFormData, setErrorMessages) {
  const trimmedTitle = title.trim()


  if (!trimmedTitle) {
    setValidFormData((prevValid) => ({ ...prevValid, title: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      title:
        'Title can not be empty.',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, title: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      title: '',
    }))
  }
}
