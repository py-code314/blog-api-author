import { createContext } from 'react'


export const AuthUIContext = createContext({
  isModalOpen: false,
  setIsModalOpen: () => {},
  handleCloseModal: () => {},
  activeModal: null,
  setActiveModal: () => {},
})


