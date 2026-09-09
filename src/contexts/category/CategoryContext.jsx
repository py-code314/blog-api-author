import { createContext } from 'react'

/* Context to show category add and edit forms */
export const CategoryContext = createContext({
  categoryId: null,
  isEdit: false,
  setIsEdit: () => {},
  isNew: false,
  setIsNew: () => {},
})
