import { createContext } from 'react'

export const TagContext = createContext({
  tagId: null,
  isEdit: false,
  setIsEdit: () => {},
  isNew: false,
  setIsNew: () => {},
})
