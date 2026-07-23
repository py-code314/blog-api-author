import { createContext } from 'react'

export const LoginFormContext = createContext({
  defaultLoginFormData: {},
  loginFormData: {},
  setLoginFormData: () => {},
  defaultValidFormData: {},
  validFormData: {},
  setValidFormData: () => {},
  loginErrorMsg: '',
  setLoginErrorMsg: () => {},
})
