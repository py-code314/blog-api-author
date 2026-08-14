
import App from '../App'
import Homepage from '../pages/homepage/Homepage'
import LandingPage from '../pages/landing-page/LandingPage'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/',
        element: <Homepage />,
      },
    ],
  },
]

export default routes
