/* Function to check for empty new post fields on form submission */
export function displayEmptyInputErrors(
  postData,
  setValidFormData,
  setErrorMsgs,
) {
  // Update state if input fields are empty
  if (!postData.title.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, title: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      title: 'Post title can not be empty.',
    }))
  } else if (!postData.content.trim()) {
    setValidFormData((prevValid) => ({ ...prevValid, content: false }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      content: 'Post content can not be empty.',
    }))
  } 
}
