/* Display errors if email isn't registered or password is wrong */
export function displayAuthErrors(data, setValidFormData, setErrorMsgs) {
  const errorMsg = data.errorMsg

  if (errorMsg.toLowerCase().includes('email')) {
    setValidFormData((prevValid) => ({
      ...prevValid,
      email: false,
    }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      email: errorMsg,
    }))
  } else if (errorMsg.toLowerCase().includes('password')) {
    setValidFormData((prevValid) => ({
      ...prevValid,
      password: false,
    }))
    setErrorMsgs((prevErrors) => ({
      ...prevErrors,
      password: errorMsg,
    }))
  }
}
