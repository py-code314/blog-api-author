import App from '../App'
// import Dashboard from '../pages/dashboard/Dashboard'
// import Homepage from '../pages/homepage/Homepage'
// import LandingPage from '../pages/landing-page/LandingPage'
import NewPost from '../pages/new-post/NewPost'
import AllPosts from '../pages/posts/posts'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'new-post',
    element: <NewPost />,
  },
  {
    path: 'all-posts',
    element: <AllPosts />,
  },
]

export default routes
