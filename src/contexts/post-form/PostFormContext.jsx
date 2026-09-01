import { createContext } from 'react'

export const PostFormContext = createContext({
  postData: {},
  setPostData: () => {},
  validFormData: {},
  setValidFormData: () => {},
  errorMsgs: {},
  setErrorMsgs: () => {},
})
