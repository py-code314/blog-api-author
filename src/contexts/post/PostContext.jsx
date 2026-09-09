import { createContext } from 'react'

/* Context to send current post data into edit post form */
export const PostContext = createContext({
  currentPostData: {},
})
