export async function displayAuthErrors(data, setValidFormData, setErrorMsgs) {
  console.log('hello')
  const errorMsg = data.errorMsg
  console.log("🚀 ~ displayAuthErrors ~ errorMsg:", errorMsg)

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