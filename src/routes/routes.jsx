import App from '../App'
// import Dashboard from '../pages/dashboard/Dashboard'
// import Homepage from '../pages/homepage/Homepage'
// import LandingPage from '../pages/landing-page/LandingPage'
import NewPost from '../pages/new-post/NewPost'

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
]

export default routes
