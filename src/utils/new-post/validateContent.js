export function validateContentInput(content, setValidFormData, setErrorMessages) {
  const trimmedContent = content.trim()

  if (!trimmedContent) {
    setValidFormData((prevValid) => ({ ...prevValid, content: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      content: 'Content can not be empty.',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, content: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      content: '',
    }))
  }
}
