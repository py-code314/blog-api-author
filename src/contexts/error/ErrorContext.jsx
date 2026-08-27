import { createContext } from 'react'

export const ErrorContext = createContext({
  deleteError: {},
  setDeleteError: () => {},
  handleDismiss: () => {},
})
