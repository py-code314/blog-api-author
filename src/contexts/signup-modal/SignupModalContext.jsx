import { createContext } from 'react'

export const SignupModalContext = createContext({
  handleSignupClose: () => {},
  defaultSignupFormData: {},
  signupFormData: {},
  setSignupFormData: () => {},
  defaultValidFormData: {},
  validFormData: {},
  setValidFormData: () => {},
  signupErrorMsg: '',
  setSignupErrorMsg: () => '',
})
