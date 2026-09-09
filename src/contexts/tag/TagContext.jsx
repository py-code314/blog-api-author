import { createContext } from 'react'

/* Context to show tag add and edit forms */
export const TagContext = createContext({
  tagId: null,
  isEdit: false,
  setIsEdit: () => {},
  isNew: false,
  setIsNew: () => {},
})
