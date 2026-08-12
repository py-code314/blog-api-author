export function validateNameInput(name, setValidFormData, setErrorMessages) {
  // Validate input
  const trimmedName = name.trim()
  // Name should only contain alphabets, spaces and hyphen with a minimum of 2 alphabets
  const nameRegex = /^(?=(?:.*[A-Za-z]){2})[A-Za-z\s-]{2,}$/

  let isAlphabetic = nameRegex.test(trimmedName)
  if (!isAlphabetic) {
    setValidFormData((prevValid) => ({ ...prevValid, name: false }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: 'Name can only contain alphabets, spaces and hyphen with a minimum of 2 alphabets',
    }))
  } else {
    setValidFormData((prevValid) => ({ ...prevValid, name: true }))
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      name: '',
    }))
  }
}
