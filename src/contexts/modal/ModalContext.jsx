import { createContext } from 'react'

// TODO: Add setIsModalOpen
export const ModalContext = createContext({
  isModalOpen: false,
  handleCloseModal: () => {},
})
