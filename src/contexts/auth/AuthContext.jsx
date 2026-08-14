import { createContext } from 'react'

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  saveToken: () => {},
  handleCloseModal: () => {},
  activeModal: null,
  setActiveModal: () => {},
  user: {},
  setUser: () => {},
})
