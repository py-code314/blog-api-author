import { createContext } from 'react'

/* Context for login info and active modal */
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
