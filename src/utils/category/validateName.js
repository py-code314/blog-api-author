export function validateNameInput(name, setValidName, setErrorMsg) {
  const trimmedName = name.trim()

  if (!trimmedName) {
    setValidName(false)
    setErrorMsg('Name can not be empty.')
  } else {
    setValidName(true)
    setErrorMsg('')
  }
}
