/* Function to validate bio */
export function validateBioInput(bio, setValidName) {
  const trimmedName = bio.trim()

  if (!trimmedName) {
    setValidName(false)
  } else {
    setValidName(true)
  }
}
