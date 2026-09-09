import { createContext } from 'react'

/* Context to show error msg when deleting a post, category, tag 
fails */
export const ErrorContext = createContext({
  deleteError: {},
  setDeleteError: () => {},
  handleDismiss: () => {},
})
