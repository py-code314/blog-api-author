import { createContext } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  handleCloseModal: () => {},
  activeModal: null,
  setActiveModal: () => { },
  user: {},
  setUser: () => {}
})
