import { createContext } from 'react'

export const NavbarContext = createContext({
  isSignup: false,
  setIsSignup: () => {},
})
