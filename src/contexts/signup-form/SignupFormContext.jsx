import { createContext } from 'react'

export const SignupFormContext = createContext({
  defaultSignupFormData: {},
  signupFormData: {},
  setSignupFormData: () => {},
  defaultValidFormData: {},
  validFormData: {},
  setValidFormData: () => {},
  signupErrorMsg: '',
  setSignupErrorMsg: () => '',
})
