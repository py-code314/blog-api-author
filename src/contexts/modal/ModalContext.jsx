import { createContext } from 'react'

export const ModalContext = createContext({
  isModalOpen: false,
  handleCloseModal: () => {},
})
