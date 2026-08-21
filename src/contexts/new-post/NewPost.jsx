import { createContext } from 'react'

export const NewPostContext = createContext({
  postData: {},
  setPostData: () => {},
  validFormData: {},
  setValidFormData: () => {},
  errorMsgs: {},
  setErrorMsgs: () => {},
})
