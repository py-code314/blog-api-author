export function displayEmptyInputError(name, setValidName, setErrorMsg) {
  // Update state if input fields are empty
  if (!name.trim()) {
    setValidName(false)
    setErrorMsg('Name can not be empty.')
  }
}
