/* Function to display errors if inputs are empty */
export function displayEmptyInputError(bio, setValidBio, setErrorMsg) {
  // Update state if input field is empty
  if (!bio.trim()) {
    setValidBio(false)
    setErrorMsg('Please add something before submitting.')
  }
}
