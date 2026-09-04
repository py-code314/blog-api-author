import { createContext } from 'react'

export const CategoryContext = createContext({
  categoryId: null,
  isEdit: false,
  setIsEdit: () => {},
  isNew: false,
  setIsNew: () => {},
})
