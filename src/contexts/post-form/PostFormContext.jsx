import { createContext } from 'react'

/* Context to send post content into TinyMCE text editor */
export const PostFormContext = createContext({
  postData: {},
  setPostData: () => {},
  validFormData: {},
  setValidFormData: () => {},
  errorMsgs: {},
  setErrorMsgs: () => {},
})
