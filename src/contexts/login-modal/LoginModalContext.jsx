import { createContext } from 'react'

export const LoginModalContext = createContext({
  handleClose: () => {},
  defaultLoginFormData: {},
  loginFormData: {},
  setLoginFormData: () => {},
  defaultValidFormData: {},
  validFormData: {},
  setValidFormData: () => {},
  loginErrorMsg: '',
  setLoginErrorMsg: () => '',
})
