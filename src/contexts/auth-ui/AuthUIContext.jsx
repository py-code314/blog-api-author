import { createContext } from 'react'

/* Context for signup and login modals */
export const AuthUIContext = createContext({
  isModalOpen: false,
  setIsModalOpen: () => {},
  handleCloseModal: () => {},
  activeModal: null,
  setActiveModal: () => {},
})


