import { createContext } from 'react'

// TODO: Change setSignupErrorMsg to () => {}
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
