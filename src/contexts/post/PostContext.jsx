import { createContext } from 'react'

export const PostContext = createContext({
  content: '',
  postData: {},
  setPostData: () => {},
  validFormData: {},
  setValidFormData: () => {},
  errorMsgs: {},
  setErrorMsgs: () => {},
})
