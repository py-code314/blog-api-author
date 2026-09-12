/* -------------------- Components -------------------- */
import App from '../App'
import Dashboard from '../components/features/dashboard/Dashboard'
import PublishedPosts from '../components/features/published-posts/PublishedPosts'
import Drafts from '../components/features/drafts/Drafts'
import NewPost from '../components/features/new-post/NewPost'
import AllPosts from '../components/features/posts/Posts'
import Post from '../components/features/post/Post'
import EditPost from '../components/sections/edit-post/EditPost'
import Categories from '../components/features/categories/Categories'
import Tags from '../components/features/tags/Tags'
import ErrorPage from '../pages/error/ErrorPage'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'new-post', element: <NewPost /> },
      { path: 'posts', element: <AllPosts /> },
      { path: 'posts/:id', element: <Post /> },
      { path: 'posts/:id/edit', element: <EditPost /> },
      { path: 'categories', element: <Categories /> },
      { path: 'tags', element: <Tags /> },
      { path: 'posts/published', element: <PublishedPosts /> },
      { path: 'posts/drafts', element: <Drafts /> },
    ],
  },
]

export default routes
