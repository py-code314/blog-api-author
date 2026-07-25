import { createContext } from 'react'


export const ModalContext = createContext({
  isModalOpen: false,
  setIsModalOpen: () => {},
  handleCloseModal: () => {},
  activeModal: null,
  setActiveModal: () => {},
})


