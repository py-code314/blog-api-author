import { createContext } from 'react'

export const NavbarContext = createContext({
  activeModal: null,
  setActiveModal: () => {},
})
