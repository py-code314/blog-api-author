/* -------------------- Components -------------------- */
import App from '../App'
import Dashboard from '../pages/dashboard/Dashboard'
import NewPost from '../pages/new-post/NewPost'
import AllPosts from '../pages/posts/posts'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'new-post', element: <NewPost /> },
      { path: 'posts', element: <AllPosts /> },
    ],
  },
]

export default routes
