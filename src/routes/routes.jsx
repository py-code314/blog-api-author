/* -------------------- Components -------------------- */
import App from '../App'
import Dashboard from '../pages/dashboard/Dashboard'
import NewPost from '../pages/new-post/NewPost'
import AllPosts from '../pages/posts/Posts'
import Post from '../pages/post/Post'
import EditPost from '../pages/edit-post/EditPost'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'new-post', element: <NewPost /> },
      { path: 'posts', element: <AllPosts /> },
      { path: 'posts/:id', element: <Post /> },
      { path: 'posts/:id/edit', element: <EditPost /> },
    ],
  },
]

export default routes
